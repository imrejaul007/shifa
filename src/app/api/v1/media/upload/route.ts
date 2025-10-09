import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import sharp from 'sharp';

// POST upload media file (admin only)
export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session || !['ADMIN', 'EDITOR'].includes(session.user.role)) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    // Check if cloud storage is configured
    const hasS3 = process.env.AWS_ACCESS_KEY_ID && process.env.AWS_S3_BUCKET;
    const hasCloudinary = process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY;

    if (!hasS3 && !hasCloudinary) {
      return NextResponse.json(
        {
          success: false,
          error: 'File uploads not configured',
          message:
            'Cloud storage (AWS S3 or Cloudinary) must be configured for file uploads. See .env.example for setup instructions.',
        },
        { status: 501 }
      );
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const alt_en = formData.get('alt_en') as string;
    const alt_ar = formData.get('alt_ar') as string;
    const tags = formData.get('tags') as string;

    if (!file) {
      return NextResponse.json({ success: false, error: 'No file provided' }, { status: 400 });
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Process image with sharp
    const metadata = await sharp(buffer).metadata();

    // TODO: Generate optimized versions when S3/CDN upload is implemented
    // const optimized = await sharp(buffer)
    //   .resize(1920, 1080, { fit: 'inside', withoutEnlargement: true })
    //   .webp({ quality: 85 })
    //   .toBuffer();
    //
    // const thumbnail = await sharp(buffer)
    //   .resize(400, 300, { fit: 'cover' })
    //   .webp({ quality: 80 })
    //   .toBuffer();

    // Generate unique key
    const timestamp = Date.now();
    const key = `${timestamp}-${file.name.replace(/\s+/g, '-')}`;

    // TODO: Upload to S3/Cloudflare
    // For now, we'll store metadata only
    // In production, you would:
    // 1. Upload optimized and thumbnail to S3
    // 2. Get CloudFront URLs
    // 3. Store URLs in database

    const media = await prisma.media.create({
      data: {
        key,
        url: `/uploads/${key}`, // Placeholder - replace with actual CDN URL
        width: metadata.width,
        height: metadata.height,
        format: metadata.format,
        size: buffer.length,
        alt_en: alt_en || '',
        alt_ar: alt_ar || '',
        tags: tags ? tags.split(',').map((t) => t.trim()) : [],
        variants: {
          optimized: `/uploads/optimized/${key}`,
          thumbnail: `/uploads/thumbnails/${key}`,
        },
      },
    });

    return NextResponse.json({
      success: true,
      message: 'File uploaded successfully',
      data: media,
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json({ success: false, error: 'Failed to upload file' }, { status: 500 });
  }
}

// Configure body parser for larger files
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};
