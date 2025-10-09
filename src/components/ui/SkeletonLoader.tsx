import { motion } from 'framer-motion';

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className = '' }: SkeletonProps) {
  return (
    <motion.div
      initial={{ opacity: 0.5 }}
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      className={`bg-muted rounded-2xl ${className}`}
    />
  );
}

export function SkeletonCard() {
  return (
    <div className="bg-card rounded-3xl p-6 border-2 border-muted">
      <Skeleton className="h-48 mb-4" />
      <Skeleton className="h-6 w-3/4 mb-3" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-5/6 mb-4" />
      <div className="flex gap-2">
        <Skeleton className="h-10 w-24" />
        <Skeleton className="h-10 w-24" />
      </div>
    </div>
  );
}

export function SkeletonTreatmentCard() {
  return (
    <div className="bg-card rounded-3xl overflow-hidden border-2 border-muted">
      <Skeleton className="h-56" />
      <div className="p-6">
        <Skeleton className="h-6 w-24 mb-3" />
        <Skeleton className="h-8 w-full mb-3" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-4/5 mb-4" />
        <div className="flex items-center gap-3 mb-4">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-20" />
        </div>
        <Skeleton className="h-12 w-full rounded-full" />
      </div>
    </div>
  );
}

export function SkeletonHospitalCard() {
  return (
    <div className="bg-card rounded-3xl p-8 border-2 border-muted">
      <div className="flex items-start gap-4 mb-4">
        <Skeleton className="h-16 w-16 rounded-2xl flex-shrink-0" />
        <div className="flex-1">
          <Skeleton className="h-6 w-3/4 mb-2" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </div>
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-5/6 mb-4" />
      <div className="flex gap-2 mb-4">
        <Skeleton className="h-6 w-20 rounded-full" />
        <Skeleton className="h-6 w-20 rounded-full" />
        <Skeleton className="h-6 w-20 rounded-full" />
      </div>
      <Skeleton className="h-12 w-full rounded-full" />
    </div>
  );
}

export function SkeletonDoctorCard() {
  return (
    <div className="bg-card rounded-3xl overflow-hidden border-2 border-muted">
      <Skeleton className="h-64" />
      <div className="p-6">
        <Skeleton className="h-6 w-full mb-2" />
        <Skeleton className="h-4 w-3/4 mb-3" />
        <Skeleton className="h-4 w-1/2 mb-4" />
        <div className="flex gap-2 mb-4">
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-16 rounded-full" />
        </div>
        <Skeleton className="h-12 w-full rounded-full" />
      </div>
    </div>
  );
}

export function SkeletonBlogCard() {
  return (
    <div className="bg-card rounded-3xl overflow-hidden border-2 border-muted">
      <Skeleton className="h-56" />
      <div className="p-6">
        <Skeleton className="h-6 w-24 mb-3 rounded-full" />
        <Skeleton className="h-6 w-full mb-3" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-5/6 mb-4" />
        <div className="flex gap-3 text-xs mb-4">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-20" />
        </div>
        <Skeleton className="h-4 w-24" />
      </div>
    </div>
  );
}

export function SkeletonTestimonial() {
  return (
    <div className="bg-card rounded-3xl p-8 border-2 border-muted">
      <div className="flex items-center gap-4 mb-4">
        <Skeleton className="h-16 w-16 rounded-full flex-shrink-0" />
        <div className="flex-1">
          <Skeleton className="h-6 w-32 mb-2" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
      <Skeleton className="h-1 w-20 mb-4" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-5/6" />
    </div>
  );
}

interface SkeletonGridProps {
  count?: number;
  type?: 'card' | 'treatment' | 'hospital' | 'doctor' | 'blog' | 'testimonial';
  columns?: 1 | 2 | 3 | 4;
}

export function SkeletonGrid({ count = 6, type = 'card', columns = 3 }: SkeletonGridProps) {
  const SkeletonComponent = {
    card: SkeletonCard,
    treatment: SkeletonTreatmentCard,
    hospital: SkeletonHospitalCard,
    doctor: SkeletonDoctorCard,
    blog: SkeletonBlogCard,
    testimonial: SkeletonTestimonial,
  }[type];

  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  }[columns];

  return (
    <div className={`grid ${gridCols} gap-8`}>
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonComponent key={index} />
      ))}
    </div>
  );
}

export function SkeletonText({ lines = 3, className = '' }: { lines?: number; className?: string }) {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, index) => (
        <Skeleton key={index} className={`h-4 ${index === lines - 1 ? 'w-5/6' : 'w-full'}`} />
      ))}
    </div>
  );
}

export function SkeletonPage() {
  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      {/* Hero Skeleton */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <Skeleton className="h-12 w-32 mx-auto mb-6 rounded-full" />
            <Skeleton className="h-16 w-full mb-6" />
            <Skeleton className="h-8 w-3/4 mx-auto mb-4" />
            <Skeleton className="h-6 w-2/3 mx-auto" />
          </div>
        </div>
      </section>

      {/* Content Skeleton */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SkeletonGrid count={6} type="card" columns={3} />
        </div>
      </section>
    </div>
  );
}
