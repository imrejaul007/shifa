'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Search, Calendar, Clock, User } from 'lucide-react';
import { useState } from 'react';
import { Card, CardBody, CardImage } from '@/components/ui/Card';
import { ButtonLink } from '@/components/ui/Button';

interface BlogPost {
  slug: string;
  title_en: string;
  title_ar: string;
  excerpt_en: string | null;
  excerpt_ar: string | null;
  featuredImage: string | null;
  author: string | null;
  publishedAt: Date | null;
  type: string | null;
}

interface Props {
  posts: BlogPost[];
  locale: 'en' | 'ar';
}

const content = {
  en: {
    title: 'Health & Wellness Blog',
    subtitle: 'Expert medical insights and treatment guides for GCC patients',
    search: 'Search articles...',
    readMore: 'Read More',
    minRead: 'min read',
    by: 'By',
    noResults: 'No articles found',
    tryAgain: 'Try adjusting your search',
    ctaTitle: 'Have Questions?',
    ctaDesc: 'Schedule a free consultation with our medical experts',
    ctaButton: 'Book Free Consultation',
  },
  ar: {
    title: 'مدونة الصحة والعافية',
    subtitle: 'رؤى طبية متخصصة وأدلة العلاج لمرضى دول مجلس التعاون الخليجي',
    search: 'بحث عن المقالات...',
    readMore: 'اقرأ المزيد',
    minRead: 'دقيقة قراءة',
    by: 'بواسطة',
    noResults: 'لم يتم العثور على مقالات',
    tryAgain: 'حاول تعديل بحثك',
    ctaTitle: 'هل لديك أسئلة؟',
    ctaDesc: 'احجز استشارة مجانية مع خبرائنا الطبيين',
    ctaButton: 'احجز استشارة مجانية',
  },
};

export default function BlogClient({ posts, locale }: Props) {
  const t = content[locale];
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = posts.filter((post) => {
    const title = locale === 'ar' ? post.title_ar : post.title_en;
    const excerpt = locale === 'ar' ? post.excerpt_ar : post.excerpt_en;
    const searchLower = searchQuery.toLowerCase();

    return (
      title.toLowerCase().includes(searchLower) ||
      excerpt?.toLowerCase().includes(searchLower) ||
      post.author?.toLowerCase().includes(searchLower)
    );
  });

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
      className={`min-h-screen bg-background ${locale === 'ar' ? 'font-arabic' : ''}`}
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
    >
      {/* Hero Section */}
      <section className="relative pt-20 sm:pt-24 pb-12 sm:pb-16 lg:pb-20 bg-gradient-to-b from-primary/5 to-transparent">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-primary leading-tight mb-6">
              {t.title}
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground mb-8">{t.subtitle}</p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search
                  className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground ${
                    locale === 'ar' ? 'right-4' : 'left-4'
                  }`}
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t.search}
                  className={`w-full min-h-[52px] py-4 text-base rounded-full bg-white border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent ${
                    locale === 'ar' ? 'pr-12 pl-4' : 'pl-12 pr-4'
                  }`}
                />
              </div>
            </div>

            {/* Results Count */}
            {searchQuery && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-4 text-sm text-muted-foreground"
              >
                {filteredPosts.length}{' '}
                {locale === 'ar' ? 'نتيجة' : filteredPosts.length === 1 ? 'result' : 'results'}
              </motion.p>
            )}
          </motion.div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredPosts.map((post, index) => {
                const title = locale === 'ar' ? post.title_ar : post.title_en;
                const excerpt = locale === 'ar' ? post.excerpt_ar : post.excerpt_en;

                return (
                  <motion.div
                    key={post.slug}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link href={`/${locale}/blog/${post.slug}`}>
                      <Card hover={true} variant="default" className="h-full flex flex-col">
                        {post.featuredImage && (
                          <CardImage src={post.featuredImage} alt={title} aspectRatio="16/9" />
                        )}
                        <CardBody className="flex-1 flex flex-col">
                          <h3 className="text-xl sm:text-2xl font-display font-bold text-primary leading-snug mb-3 line-clamp-2">
                            {title}
                          </h3>
                          {excerpt && (
                            <p className="text-base sm:text-lg text-muted-foreground mb-4 line-clamp-3 flex-1">
                              {excerpt}
                            </p>
                          )}

                          {/* Meta Info */}
                          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4 pb-4 border-b border-border">
                            {post.author && (
                              <div className="flex items-center gap-2">
                                <User className="w-4 h-4" />
                                <span className="line-clamp-1">{post.author}</span>
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
                              <span>5 {t.minRead}</span>
                            </div>
                          </div>

                          {/* CTA */}
                          <div className="flex items-center justify-between mt-auto">
                            <span className="text-sm font-medium text-accent">{t.readMore}</span>
                            <ArrowRight className="w-5 h-5 text-accent" />
                          </div>
                        </CardBody>
                      </Card>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="mb-4">
                <Search className="w-12 h-12 sm:w-14 sm:h-14 text-muted-foreground mx-auto opacity-30" />
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-2">
                {t.noResults}
              </h3>
              <p className="text-base sm:text-lg text-muted-foreground">{t.tryAgain}</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-primary/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center glass rounded-3xl p-8 sm:p-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-primary leading-tight mb-6">
              {t.ctaTitle}
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground mb-8">{t.ctaDesc}</p>
            <ButtonLink
              href={`/${locale}/consultation`}
              variant="gold"
              size="lg"
              rightIcon={<ArrowRight className="w-5 h-5" />}
            >
              {t.ctaButton}
            </ButtonLink>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
