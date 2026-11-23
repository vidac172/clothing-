import React, { useState } from 'react';
import { Ruler, X } from 'lucide-react';
import { CategoryKey } from '../types/commerce';

interface SizeChartModalProps {
  isOpen: boolean;
  category: Exclude<CategoryKey, 'All'>;
  onClose: () => void;
}

const APPAREL_SIZES = [
  { size: 'XS', chestIn: '33–34', waistIn: '26–27', hipIn: '36–37', chestCm: '84–86', waistCm: '66–69', hipCm: '91–94' },
  { size: 'S', chestIn: '35–36', waistIn: '28–29', hipIn: '38–39', chestCm: '89–91', waistCm: '71–74', hipCm: '96–99' },
  { size: 'M', chestIn: '37–39', waistIn: '30–32', hipIn: '40–41', chestCm: '94–99', waistCm: '76–81', hipCm: '101–104' },
  { size: 'L', chestIn: '40–42', waistIn: '33–35', hipIn: '42–44', chestCm: '101–107', waistCm: '84–89', hipCm: '107–112' },
  { size: 'XL', chestIn: '43–45', waistIn: '36–38', hipIn: '45–47', chestCm: '109–114', waistCm: '91–96', hipCm: '114–119' },
];

const FOOTWEAR_SIZES = [
  { uk: 'UK 6', eu: '40', us: '7', cm: '25.0' },
  { uk: 'UK 7', eu: '41', us: '8', cm: '25.8' },
  { uk: 'UK 8', eu: '42', us: '9', cm: '26.6' },
  { uk: 'UK 9', eu: '43', us: '10', cm: '27.4' },
  { uk: 'UK 10', eu: '44', us: '11', cm: '28.2' },
];

export const SizeChartModal: React.FC<SizeChartModalProps> = ({
  isOpen,
  category,
  onClose,
}) => {
  const [unit, setUnit] = useState<'in' | 'cm'>('in');

  if (!isOpen) return null;

  const isFootwear = category === 'Footwear';

  return (
    <div
      className="fixed inset-0 z-50 bg-[#161b2d]/45 backdrop-blur-xs flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Size Guide"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg bg-white rounded shadow-overlay-panel overflow-hidden"
      >
        <div className="px-6 py-4 border-b border-[#eaeaec] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Ruler className="w-4 h-4 text-[#ff3f6c]" />
            <h2 className="font-display text-base font-bold text-[#282c3f]">
              {isFootwear ? 'Footwear Size Conversion' : 'Garment Size Guide'}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close size chart"
            className="p-1.5 text-[#535766] hover:text-[#282c3f] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {!isFootwear && (
            <div className="flex items-center justify-between mb-4">
              <p className="text-xs text-[#535766]">
                Body measurements for standard {category} tailoring
              </p>
              <div className="inline-flex rounded bg-[#f5f5f6] p-0.5">
                <button
                  type="button"
                  onClick={() => setUnit('in')}
                  className={`px-3 py-1 rounded text-xs font-display font-bold transition-colors cursor-pointer ${
                    unit === 'in'
                      ? 'bg-[#282c3f] text-white'
                      : 'text-[#535766] hover:text-[#282c3f]'
                  }`}
                >
                  IN
                </button>
                <button
                  type="button"
                  onClick={() => setUnit('cm')}
                  className={`px-3 py-1 rounded text-xs font-display font-bold transition-colors cursor-pointer ${
                    unit === 'cm'
                      ? 'bg-[#282c3f] text-white'
                      : 'text-[#535766] hover:text-[#282c3f]'
                  }`}
                >
                  CM
                </button>
              </div>
            </div>
          )}

          <div className="overflow-x-auto border border-[#eaeaec] rounded">
            {isFootwear ? (
              <table className="w-full text-left text-sm">
                <thead className="bg-[#f5f5f6] font-display text-xs uppercase text-[#535766]">
                  <tr>
                    <th className="py-2.5 px-4 font-bold">UK Size</th>
                    <th className="py-2.5 px-4 font-bold">EU Size</th>
                    <th className="py-2.5 px-4 font-bold">US Size</th>
                    <th className="py-2.5 px-4 font-bold">Foot Length (cm)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#eaeaec] tabular-nums">
                  {FOOTWEAR_SIZES.map((row) => (
                    <tr key={row.uk} className="hover:bg-[#fbf8ff]">
                      <td className="py-2.5 px-4 font-display font-bold text-[#282c3f]">{row.uk}</td>
                      <td className="py-2.5 px-4 text-[#535766]">{row.eu}</td>
                      <td className="py-2.5 px-4 text-[#535766]">{row.us}</td>
                      <td className="py-2.5 px-4 text-[#282c3f]">{row.cm}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <table className="w-full text-left text-sm">
                <thead className="bg-[#f5f5f6] font-display text-xs uppercase text-[#535766]">
                  <tr>
                    <th className="py-2.5 px-4 font-bold">Size</th>
                    <th className="py-2.5 px-4 font-bold">Chest ({unit})</th>
                    <th className="py-2.5 px-4 font-bold">Waist ({unit})</th>
                    <th className="py-2.5 px-4 font-bold">Hip ({unit})</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#eaeaec] tabular-nums">
                  {APPAREL_SIZES.map((row) => (
                    <tr key={row.size} className="hover:bg-[#fbf8ff]">
                      <td className="py-2.5 px-4 font-display font-bold text-[#282c3f]">{row.size}</td>
                      <td className="py-2.5 px-4 text-[#535766]">
                        {unit === 'in' ? row.chestIn : row.chestCm}
                      </td>
                      <td className="py-2.5 px-4 text-[#535766]">
                        {unit === 'in' ? row.waistIn : row.waistCm}
                      </td>
                      <td className="py-2.5 px-4 text-[#535766]">
                        {unit === 'in' ? row.hipIn : row.hipCm}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          <p className="text-xs text-[#535766] mt-4">
            Between two sizes? Size up for a relaxed tailored drape or choose your exact chest measurement for a sharp structured silhouette.
          </p>
        </div>
      </div>
    </div>
  );
};
