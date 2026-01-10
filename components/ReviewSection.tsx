
import React, { useState, useRef } from 'react';
import { Review } from '../types';
import { Icons } from '../constants';

interface ReviewSectionProps {
  reviews: Review[];
  canReview: boolean;
}

const ReviewSection: React.FC<ReviewSectionProps> = ({ reviews: initialReviews, canReview }) => {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form State
  const [userName, setUserName] = useState('');
  const [rating, setRating] = useState(5);
  const [ecoRating, setEcoRating] = useState(5);
  const [comment, setComment] = useState('');
  const [mediaPreviews, setMediaPreviews] = useState<{ type: 'image' | 'video', url: string }[]>([]);

  const handleMediaUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newMedia = Array.from(files).map((file: File) => ({
        type: file.type.startsWith('video') ? 'video' as const : 'image' as const,
        url: URL.createObjectURL(file)
      }));
      setMediaPreviews(prev => [...prev, ...newMedia]);
    }
  };

  const removeMedia = (index: number) => {
    setMediaPreviews(prev => {
      const updated = [...prev];
      URL.revokeObjectURL(updated[index].url);
      updated.splice(index, 1);
      return updated;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName || !comment) return;

    setSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      const newReview: Review = {
        id: Math.random().toString(36).substr(2, 9),
        user: userName,
        rating,
        ecoAccuracyRating: ecoRating,
        comment,
        date: new Date().toISOString().split('T')[0],
        media: mediaPreviews.length > 0 ? mediaPreviews : undefined
      };
      
      setReviews([newReview, ...reviews]);
      setSubmitting(false);
      setSuccess(true);
      
      // Reset form
      setUserName('');
      setComment('');
      setRating(5);
      setEcoRating(5);
      setMediaPreviews([]);

      setTimeout(() => {
        setSuccess(false);
        setShowForm(false);
      }, 2000);
    }, 1000);
  };

  const StarRating = ({ value, onChange }: { value: number; onChange: (v: number) => void }) => (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((s) => (
        <button
          key={s}
          type="button"
          onClick={() => onChange(s)}
          className={`text-2xl transition-colors ${s <= value ? 'text-amber-400' : 'text-stone-200'}`}
        >
          ★
        </button>
      ))}
    </div>
  );

  const EcoRating = ({ value, onChange }: { value: number; onChange: (v: number) => void }) => (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((s) => (
        <button
          key={s}
          type="button"
          onClick={() => onChange(s)}
          className={`text-2xl transition-colors ${s <= value ? 'text-emerald-500' : 'text-stone-200'}`}
        >
          ●
        </button>
      ))}
    </div>
  );

  return (
    <div className="mt-16 pt-12 border-t border-stone-200">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h3 className="text-3xl font-bold text-stone-900 mb-2 font-serif">Community Feedback</h3>
          <p className="text-stone-500 text-sm">Real reviews from conscious consumers like you.</p>
        </div>
        {!showForm && !success && canReview && (
          <button
            onClick={() => setShowForm(true)}
            className="bg-stone-900 text-white px-8 py-3 rounded-full text-sm font-bold hover:bg-emerald-700 transition-all flex items-center gap-2"
          >
            <Icons.Camera />
            Write a Review
          </button>
        )}
        {!showForm && !success && !canReview && (
          <div className="bg-stone-100 px-6 py-3 rounded-full text-[10px] font-bold text-stone-400 uppercase tracking-widest border border-stone-200">
             Sign in to write a review
          </div>
        )}
      </div>

      {success && (
        <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-3xl text-center mb-8 animate-in fade-in zoom-in duration-300">
          <p className="text-emerald-800 font-bold">Thank you for your review! It's been posted successfully.</p>
        </div>
      )}

      {showForm && !success && (
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-[2.5rem] border border-stone-200 mb-12 shadow-xl animate-in fade-in slide-in-from-top-6 duration-500">
          <div className="flex justify-between items-center mb-6 border-b border-stone-100 pb-4">
            <h4 className="text-xl font-bold font-serif">Share Your Experience</h4>
            <button type="button" onClick={() => setShowForm(false)} className="text-stone-400 hover:text-red-500 transition-colors">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-stone-500 uppercase tracking-widest">Display Name</label>
                <input
                  required
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="e.g. EcoFashionista_99"
                  className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                />
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] font-bold text-stone-500 uppercase tracking-widest">Product Quality</label>
                  <StarRating value={rating} onChange={setRating} />
                </div>
                <div className="flex justify-between items-center">
                  <label className="text-[10px] font-bold text-stone-500 uppercase tracking-widest">Eco-Claim Accuracy</label>
                  <EcoRating value={ecoRating} onChange={setEcoRating} />
                </div>
              </div>
              
              <div className="space-y-3">
                <label className="text-[10px] font-bold text-stone-500 uppercase tracking-widest">Upload Media (Optional)</label>
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-stone-200 rounded-2xl p-4 text-center cursor-pointer hover:bg-stone-50 transition-colors"
                >
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    multiple 
                    accept="image/*,video/*" 
                    onChange={handleMediaUpload} 
                  />
                  <div className="flex flex-col items-center gap-1 text-stone-400">
                    <Icons.Camera />
                    <span className="text-xs font-bold uppercase tracking-tight">Add Photos or Video</span>
                  </div>
                </div>
                
                {mediaPreviews.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {mediaPreviews.map((m, idx) => (
                      <div key={idx} className="relative w-16 h-16 rounded-lg overflow-hidden border border-stone-200 group">
                        {m.type === 'image' ? (
                          <img src={m.url} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full bg-stone-900 flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.333-5.89a1.5 1.5 0 000-2.538L6.3 2.841z" />
                            </svg>
                          </div>
                        )}
                        <button 
                          type="button" 
                          onClick={() => removeMedia(idx)}
                          className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
                        >
                          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-stone-500 uppercase tracking-widest">Your Review</label>
              <textarea
                required
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={8}
                placeholder="How does it feel? Is the packaging sustainable? Would you recommend this brand's transparency?"
                className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all resize-none h-full"
              />
            </div>
          </div>

          <button
            disabled={submitting}
            className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-500/20 disabled:opacity-50 active:scale-[0.98]"
          >
            {submitting ? 'Publishing...' : 'Submit Review'}
          </button>
        </form>
      )}

      {reviews.length === 0 ? (
        <div className="text-center py-20 bg-stone-50 border-2 border-dashed border-stone-200 rounded-[3rem]">
          <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
            <svg className="w-8 h-8 text-stone-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <h4 className="text-xl font-bold text-stone-900 mb-2 font-serif">No Reviews Yet</h4>
          <p className="text-stone-500 max-w-xs mx-auto text-sm">Be the first to share your thoughts on this ethical piece and help others shop sustainably.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white p-8 rounded-[2rem] border border-stone-100 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full group">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center font-bold text-sm shadow-sm">
                    {review.user.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="font-bold text-stone-900 text-sm group-hover:text-emerald-700 transition-colors">{review.user}</h4>
                    <span className="text-[10px] text-stone-400 font-medium">{review.date}</span>
                  </div>
                </div>
              </div>
              
              <p className="text-stone-600 text-sm leading-relaxed mb-6 italic">
                "{review.comment}"
              </p>

              {review.media && review.media.length > 0 && (
                <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
                  {review.media.map((m, i) => (
                    <div key={i} className="w-20 h-20 shrink-0 rounded-xl overflow-hidden border border-stone-100 bg-stone-50 shadow-sm">
                      {m.type === 'image' ? (
                        <img src={m.url} className="w-full h-full object-cover" />
                      ) : (
                        <video src={m.url} className="w-full h-full object-cover" muted playsInline />
                      )}
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-auto pt-6 border-t border-stone-50 flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Quality</span>
                  <div className="flex text-amber-400 text-xs">
                    {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Eco-Truth</span>
                  <div className="flex text-emerald-500 text-xs">
                    {'●'.repeat(review.ecoAccuracyRating)}{'○'.repeat(5 - review.ecoAccuracyRating)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewSection;
