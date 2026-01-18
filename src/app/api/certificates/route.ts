import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const certificatesDir = path.join(process.cwd(), 'public', 'assets', 'certificates');
    
    if (!fs.existsSync(certificatesDir)) {
      return NextResponse.json({ certificates: [] });
    }

    const files = fs.readdirSync(certificatesDir);
    
    const certificates = files
      .filter(file => /\.(png|jpg|jpeg|gif|webp)$/i.test(file))
      .map(file => {
        const nameWithoutExt = file.replace(/\.(png|jpg|jpeg|gif|webp)$/i, '');
        const nameWithSpaces = nameWithoutExt
          .replace(/[-_]/g, ' ')
          .replace(/([a-z])([A-Z])/g, '$1 $2')
          .replace(/([A-Z])([A-Z][a-z])/g, '$1 $2');
        
        return {
          filename: file,
          url: `/assets/certificates/${file}`,
          name: nameWithSpaces
        };
      });

    return NextResponse.json({ certificates });
  } catch (error) {
    console.error('Error reading certificates:', error);
    return NextResponse.json({ certificates: [] });
  }
}
