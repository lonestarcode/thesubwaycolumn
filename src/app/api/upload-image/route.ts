import { NextRequest, NextResponse } from 'next/server';
import { put } from '@vercel/blob';

function bearer(req: NextRequest): string | null {
  const h = req.headers.get('authorization') || '';
  const m = /^Bearer\s+(.+)$/i.exec(h);
  return m ? m[1] : null;
}

export async function POST(request: NextRequest) {
  try {
    // Authenticate request
    const token = bearer(request);
    const expected = process.env.SITE_API_TOKEN || '';
    if (!expected || token !== expected) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Parse multipart form data
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({
        error: 'Invalid file type. Only JPEG, PNG, GIF, and WebP images are allowed.'
      }, { status: 400 });
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return NextResponse.json({
        error: 'File too large. Maximum size is 10MB.'
      }, { status: 400 });
    }

    // Generate unique filename
    const timestamp = Date.now();
    const extension = file.name.split('.').pop() || 'jpg';
    const filename = `image-${timestamp}.${extension}`;

    let uploadedUrl: string;

    // Check if Vercel Blob is configured
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      try {
        // Upload to Vercel Blob Storage
        const blob = await put(filename, file, {
          access: 'public',
          addRandomSuffix: true,
        });
        uploadedUrl = blob.url;
        console.log(`✅ Uploaded to Vercel Blob: ${uploadedUrl}`);
      } catch (error) {
        console.error('❌ Vercel Blob upload failed:', error);
        throw new Error('Upload to Vercel Blob failed');
      }
    } else {
      // Fallback for development: Use a demo image service
      console.log(`📸 Development mode: Using demo image for ${filename} (${file.size} bytes)`);

      // Convert to buffer for hash generation
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const crypto = await import('crypto');
      const hash = crypto.createHash('md5').update(buffer).digest('hex').substring(0, 8);
      uploadedUrl = `https://picsum.photos/800/600?random=${hash}`;
    }

    return NextResponse.json({
      url: uploadedUrl,
      filename: filename,
      size: file.size,
      type: file.type
    });

  } catch {
    console.error('❌ Upload error occurred');
    return NextResponse.json({
      error: 'Upload failed'
    }, { status: 500 });
  }
}