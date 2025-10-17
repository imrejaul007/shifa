'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, User, ArrowLeft, Clock, ArrowRight } from 'lucide-react';
import { Card, CardBody } from '@/components/ui/Card';
import { ButtonLink } from '@/components/ui/Button';
import type { Prisma } from '@prisma/client';

interface Post {
  id: string;
  slug: string;
  title_en: string;
  title_ar: string;
  excerpt_en: string | null;
  excerpt_ar: string | null;
  blocks_en: Prisma.JsonValue;
  blocks_ar: Prisma.JsonValue;
  featuredImage: string | null;
  author: string | null;
  publishedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

interface RelatedPost {
  slug: string;
  title_en: string;
  title_ar: string;
  excerpt_en: string | null;
  excerpt_ar: string | null;
  featuredImage: string | null;
  publishedAt: Date | null;
}

interface Props {
  post: Post;
  relatedPosts: RelatedPost[];
  locale: 'en' | 'ar';
}

const content = {
  en: {
    breadcrumb: { home: 'Home', blog: 'Blog' },
    backToBlog: 'Back to Blog',
    readingTime: 'min read',
    relatedArticles: 'Related Articles',
    readMore: 'Read More',
    shareArticle: 'Share This Article',
    getStarted: 'Ready to Start Your Medical Journey?',
    getStartedDesc: 'Contact us for a free consultation',
    bookConsultation: 'Book Free Consultation',
  },
  ar: {
    breadcrumb: { home: 'الرئيسية', blog: 'المدونة' },
    backToBlog: 'العودة إلى المدونة',
    readingTime: 'دقيقة قراءة',
    relatedArticles: 'مقالات ذات صلة',
    readMore: 'اقرأ المزيد',
    shareArticle: 'شارك هذا المقال',
    getStarted: 'هل أنت مستعد لبدء رحلتك الطبية؟',
    getStartedDesc: 'اتصل بنا للحصول على استشارة مجانية',
    bookConsultation: 'احجز استشارة مجانية',
  },
};

export default function BlogPostClient({ post, relatedPosts, locale }: Props) {
  const t = content[locale];
  const title = locale === 'ar' ? post.title_ar : post.title_en;
  const excerpt = locale === 'ar' ? post.excerpt_ar : post.excerpt_en;
  const blocks = locale === 'ar' ? post.blocks_ar : post.blocks_en;

  const formatDate = (date: Date | null) => {
    if (!date) return '';
    return new Intl.DateTimeFormat(locale === 'ar' ? 'ar-SA' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(new Date(date));
  };

  return (
    <main
      className={`min-h-screen bg-background pt-20 sm:pt-24 ${locale === 'ar' ? 'font-arabic' : ''}`}
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
    >
      {/* Hero */}
      <section className="relative py-12 sm:py-16 lg:py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-4xl">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, x: locale === 'ar' ? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 text-sm text-muted-foreground mb-6"
          >
            <Link href={`/${locale}`} className="hover:text-accent transition-colors">
              {t.breadcrumb.home}
            </Link>
            <span>/</span>
            <Link href={`/${locale}/blog`} className="hover:text-accent transition-colors">
              {t.breadcrumb.blog}
            </Link>
            <span>/</span>
            <span className="text-foreground line-clamp-1">{title}</span>
          </motion.div>

          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: locale === 'ar' ? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-8"
          >
            <Link
              href={`/${locale}/blog`}
              className="inline-flex items-center gap-2 text-accent hover:text-accent/80 transition-colors"
            >
              <ArrowLeft className={`w-4 h-4 ${locale === 'ar' ? 'rotate-180' : ''}`} />
              <span>{t.backToBlog}</span>
            </Link>
          </motion.div>

          {/* Article Header */}
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-primary leading-tight mb-6">
              {title}
            </h1>

            {excerpt && (
              <p className="text-base sm:text-lg text-muted-foreground mb-8 leading-relaxed">
                {excerpt}
              </p>
            )}

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-8 pb-8 border-b border-border">
              {post.author && (
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{post.author}</span>
                </div>
              )}
              {post.publishedAt && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <time dateTime={post.publishedAt.toISOString()}>
                    {formatDate(post.publishedAt)}
                  </time>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>5 {t.readingTime}</span>
              </div>
            </div>

            {/* Featured Image */}
            {post.featuredImage && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mb-12 rounded-2xl overflow-hidden relative aspect-video"
              >
                <Image
                  src={post.featuredImage}
                  alt={title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                />
              </motion.div>
            )}

            {/* Content */}
            <div className="prose prose-lg max-w-none text-foreground/80">
              {blocks && typeof blocks === 'object' && blocks !== null && 'content' in blocks ? (
                <div
                  dangerouslySetInnerHTML={{
                    __html: String((blocks as { content: unknown }).content || ''),
                  }}
                />
              ) : (
                <p className="text-muted-foreground italic">Content coming soon...</p>
              )}
            </div>
          </motion.article>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-12 sm:py-16 lg:py-20 bg-secondary/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-primary mb-12 text-center">
              {t.relatedArticles}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
              {relatedPosts.map((related, index) => (
                <motion.div
                  key={related.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link href={`/${locale}/blog/${related.slug}`}>
                    <Card hover={true} variant="default">
                      <CardBody>
                        {related.featuredImage && (
                          <div className="mb-4 rounded-lg overflow-hidden aspect-video relative">
                            <Image
                              src={related.featuredImage}
                              alt={locale === 'ar' ? related.title_ar : related.title_en}
                              fill
                              className="object-cover"
                              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            />
                          </div>
                        )}
                        <h3 className="text-lg sm:text-xl font-display font-bold text-primary leading-snug mb-2 line-clamp-2">
                          {locale === 'ar' ? related.title_ar : related.title_en}
                        </h3>
                        {(locale === 'ar' ? related.excerpt_ar : related.excerpt_en) && (
                          <p className="text-base sm:text-lg text-muted-foreground mb-4 line-clamp-3">
                            {locale === 'ar' ? related.excerpt_ar : related.excerpt_en}
                          </p>
                        )}
                        <div className="flex items-center gap-2 text-accent">
                          <span className="text-sm font-medium">{t.readMore}</span>
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </CardBody>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto glass rounded-3xl p-8 sm:p-12 text-center"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-primary leading-tight mb-4">
              {t.getStarted}
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground mb-8">{t.getStartedDesc}</p>
            <ButtonLink href={`/${locale}/consultation`} variant="gold" size="lg">
              {t.bookConsultation}
            </ButtonLink>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
