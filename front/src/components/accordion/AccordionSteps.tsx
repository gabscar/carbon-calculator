import React, { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

type Step = {
  title: string;
  content: React.ReactNode;
};

type Props = {
  steps: Step[];
};

const AccordionSteps: React.FC<Props> = ({ steps }) => {
  const [expanded, setExpanded] = useState<number | false>(false);

  const handleChange = (index: number) => (_: any, isExpanded: boolean) => {
    setExpanded(isExpanded ? index : false);
  };

  return (
    <Box>
      {steps.map((step, index) => (
        <Accordion
          key={index}
          expanded={expanded === index}
          onChange={handleChange(index)}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />} className="py-2">
            <Typography variant="subtitle1">{step.title}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box>{step.content}</Box>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default AccordionSteps;
