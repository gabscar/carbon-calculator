import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useTheme } from "@mui/material/styles";
type Step = {
  title: string;
  content: React.ReactNode;
  icon?: React.ReactNode;
  description?: string;
};

type Props = {
  steps: Step[];
  expandedPanels?: number[];
  onChangePanels?: (panels: number[]) => void;
};

const AccordionSteps: React.FC<Props> = ({ steps, expandedPanels, onChangePanels }) => {
  const [expanded, setExpanded] = useState<number[]>([]);
  const theme = useTheme();
  useEffect(() => {
    if (expandedPanels) {
      const newExpanded = new Set([...expanded, ...expandedPanels]);
      setExpanded(Array.from(newExpanded));
    }
  }, [expandedPanels]);

  const handleChange = (index: number) => (_: any, isExpanded: boolean) => {
    let newExpanded: number[];
    if (isExpanded) {
      newExpanded = [...expanded, index];
    } else {
      newExpanded = expanded.filter((i) => i !== index);
    }
    setExpanded(newExpanded);
    onChangePanels?.(newExpanded);
  };

  return (
    <Box>
      {steps.map((step, index) => (
        <Accordion
          key={index}
          expanded={expanded.includes(index)}
          onChange={handleChange(index)}
          sx={{ background: theme.palette.resultBox.main, color: theme.palette.resultBox.contrastText}}
          className="mb-1"
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />} className="py-2">
            {step.icon && <Box sx={{ mr: 2 }}>{step.icon}</Box>}
            <Typography variant="subtitle1">{step.title}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {step.description && <Typography variant="body1" color="text.secondary" mb={2}>{step.description}</Typography>}
            <Box>{step.content}</Box>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default AccordionSteps;
