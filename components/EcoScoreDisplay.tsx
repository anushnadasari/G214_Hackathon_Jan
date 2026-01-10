
import React from 'react';
import { EcoScore } from '../types';

interface EcoScoreDisplayProps {
  score: EcoScore;
  compact?: boolean;
}

const EcoScoreDisplay: React.FC<EcoScoreDisplayProps> = ({ score, compact = false }) => {
  const getGradeColor = (total: number) => {
    if (total >= 85) return 'bg-emerald-600';
    if (total >= 70) return 'bg-green-500';
    if (total >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getLabel = (total: number) => {
    if (total >= 85) return 'Excellent';
    if (total >= 70) return 'Good';
    if (total >= 50) return 'Fair';
    return 'Low Impact';
  };

  if (compact) {
    return (
      <div className="flex items-center gap-2">
        <div className={`text-xs font-bold px-2 py-1 rounded text-white ${getGradeColor(score.total)}`}>
          {score.total}
        </div>
        <span className="text-xs font-medium text-stone-600">Eco-Score</span>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h3 className="text-sm font-semibold text-stone-500 uppercase tracking-wider">Sustainability Impact</h3>
          <div className="text-4xl font-bold text-stone-900 mt-1">{score.total}<span className="text-xl text-stone-400">/100</span></div>
        </div>
        <div className={`px-4 py-1.5 rounded-full text-white text-sm font-bold ${getGradeColor(score.total)}`}>
          {getLabel(score.total)}
        </div>
      </div>

      <div className="space-y-4">
        <ScoreItem label="Materials" value={score.material} max={40} color="bg-emerald-500" />
        <ScoreItem label="Ethical Labor" value={score.labor} max={30} color="bg-teal-500" />
        <ScoreItem label="Certifications" value={score.certification} max={20} color="bg-indigo-500" />
        <ScoreItem label="Transparency" value={score.transparency} max={10} color="bg-sky-500" />
      </div>

      <div className="mt-6 pt-4 border-t border-stone-100 grid grid-cols-2 gap-4">
        <div className="text-[10px] text-stone-400">
          *Scores are calculated based on verified brand disclosures and third-party certifications.
        </div>
        <div className="flex justify-end gap-1">
           {score.certification >= 10 && <CertificationBadge label="GOTS" />}
           {score.certification >= 20 && <CertificationBadge label="Fair Trade" />}
        </div>
      </div>
    </div>
  );
};

const ScoreItem = ({ label, value, max, color }: { label: string, value: number, max: number, color: string }) => (
  <div className="space-y-1">
    <div className="flex justify-between text-xs font-medium">
      <span className="text-stone-600">{label}</span>
      <span className="text-stone-900 font-bold">{value}/{max}</span>
    </div>
    <div className="h-2 w-full bg-stone-100 rounded-full overflow-hidden">
      <div 
        className={`h-full ${color} transition-all duration-1000`} 
        style={{ width: `${(value / max) * 100}%` }}
      />
    </div>
  </div>
);

const CertificationBadge = ({ label }: { label: string }) => (
  <div className="flex items-center gap-1 bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded text-[10px] font-bold border border-emerald-100">
    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
    {label}
  </div>
);

export default EcoScoreDisplay;
