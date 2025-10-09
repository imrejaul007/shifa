import { generateJsonLd } from '@/lib/schema';

interface JsonLdProps {
  data: any;
}

export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={generateJsonLd(data)}
      key="jsonld"
    />
  );
}
