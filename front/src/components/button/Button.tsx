import React from 'react';
import { Button, Box } from '@mui/material';
import type { ButtonProps } from '@mui/material';
import Loading from '@/components/loading/Loading';

type AlignOption = 'start' | 'center' | 'end';

type Props = ButtonProps & {
  align?: AlignOption;
  loading?: boolean;
};

const alignmentMap: Record<AlignOption, string> = {
  start: 'justify-content-start',
  center: 'justify-content-center',
  end: 'justify-content-end',
};
const CustomButton: React.FC<Props> = ({ align = 'center', children, loading = false, ...rest }) => {
  return (
    <Box
      className={`d-flex ${alignmentMap[align]}`}
      justifyContent="center"
      alignItems="center"
      width="100%"
      height="100%"
      mt={2}
    >
      <Button {...rest} disabled={loading} startIcon={loading ? <Loading /> : undefined}  >
        {children}
      </Button>
    </Box>
  );
};

export default CustomButton;
