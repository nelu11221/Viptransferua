// SVG flags from `country-flag-icons`, imported one by one so the bundle only
// carries the dozen or so we actually show (the package ships ~250).
import AT from 'country-flag-icons/react/3x2/AT'
import BE from 'country-flag-icons/react/3x2/BE'
import BG from 'country-flag-icons/react/3x2/BG'
import CZ from 'country-flag-icons/react/3x2/CZ'
import DE from 'country-flag-icons/react/3x2/DE'
import FR from 'country-flag-icons/react/3x2/FR'
import HU from 'country-flag-icons/react/3x2/HU'
import IL from 'country-flag-icons/react/3x2/IL'
import IT from 'country-flag-icons/react/3x2/IT'
import NL from 'country-flag-icons/react/3x2/NL'
import PL from 'country-flag-icons/react/3x2/PL'
import RO from 'country-flag-icons/react/3x2/RO'
import RU from 'country-flag-icons/react/3x2/RU'
import SK from 'country-flag-icons/react/3x2/SK'
import UA from 'country-flag-icons/react/3x2/UA'

const FLAGS = { AT, BE, BG, CZ, DE, FR, HU, IL, IT, NL, PL, RO, RU, SK, UA }

export default function CountryFlag({ code, className = '' }) {
  const Flag = FLAGS[code]
  if (!Flag) return null
  return <Flag className={`flag ${className}`.trim()} aria-hidden="true" />
}
