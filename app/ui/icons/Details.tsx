import React from 'react';

import { cn } from '@/utils/cn';
export interface IconProps extends React.SVGProps<SVGSVGElement> {}

const Details = React.forwardRef<SVGSVGElement, IconProps>(({ className, ...props }, ref) => (
  <svg ref={ref}
    className={cn('', className)}
    width='16'
    height='16'
    viewBox='0 0 16 16'
    xmlns='http://www.w3.org/2000/svg'
    fill='currentColor'
    {...props}
  >
    <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3" />
  </svg>
));

Details.displayName = 'Details';
export default Details;