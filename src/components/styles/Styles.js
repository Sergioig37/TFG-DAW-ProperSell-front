import {styled } from '@mui/material';
import {Accordion} from "@mui/material";
import { ImageList } from "@mui/material";

export const StyledImageList = styled(ImageList)(({ theme }) => ({
    borderRadius: theme.shape.borderRadius,
    overflow: 'hidden',
    transform: 'scale(1.01)',
    boxShadow: theme.shadows[5],
    '&:hover': {
      transform: 'scale(1.03)',
      boxShadow: theme.shadows[8],
    },
  }));
  
export const StyledAccordion = styled(Accordion)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    margin: '0 auto',
    '&:before': {
      display: 'none',
    },
  }));