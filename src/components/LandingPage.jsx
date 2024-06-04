import React from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

import Paper from "@mui/material/Paper";

import Typography from "@mui/material/Typography";

import { ImageListItem } from "@mui/material";
import { AccordionSummary } from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import { AccordionDetails } from "@mui/material";

import { useNavigate } from "react-router-dom";
import { faqs, itemData } from "./data/Data";
import { StyledAccordion, StyledImageList } from "./styles/Styles";
import { NavbarGeneral } from "./NavbarGeneral";
import { useAuth } from "./auth/AuthContext";

export const LandingPage = () => {
  const navigate = useNavigate();
  const token = useAuth().getToken();
  const handleHome = () => {
    navigate("/explore");
  };

  return (
    <>
      <NavbarGeneral />
      <Container>
        <Box mt={4}>
          <Typography variant="h4" align="center" gutterBottom>
            ¡Bienvenido a ProperSell!
          </Typography>
          <Typography variant="body1" align="center" paragraph>
            Somos una empresa dedicada a ayudarte a encontrar la casa de tus
            sueños.
          </Typography>
        </Box>

        <Box textAlign="center" my={4}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleHome}
          >
            Ver propiedades
          </Button>
        </Box>

        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} md={6}>
            <Paper elevation={6} sx={{ p: 2 }}>
              <Typography variant="h5" align="center" gutterBottom>
                Encuentra tu Hogar
              </Typography>
              <Typography variant="body2" align="center">
                Explora una amplia gama de propiedades e inmobiliarias
                dispuestas a ayudarte encontrar un hogar.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={6} sx={{ p: 2 }}>
              <Typography variant="h5" align="center" gutterBottom>
                Vende tu Propiedad
              </Typography>
              <Typography variant="body2" align="center">
                Benefíciate de nuestra experiencia y red de contactos para
                vender tu propiedad rápidamente.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
        <Box my={4}>
          {/* Galería de imágenes */}
          <StyledImageList cols={3} gap={8}>
            {itemData.map((item) => (
              <ImageListItem key={item.img}>
                <img
                  src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                  srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                  alt={item.title}
                  loading="lazy"
                />
              </ImageListItem>
            ))}
          </StyledImageList>
        </Box>
        <Box my={4}>
          {/* Sección de FAQ */}
          <Typography variant="h5" align="center" gutterBottom>
            Preguntas Frecuentes
          </Typography>
          {faqs.map((faq) => (
            <StyledAccordion key={faq.question}>
              <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>{faq.question}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{faq.answer}</Typography>
              </AccordionDetails>
            </StyledAccordion>
          ))}
        </Box>
      </Container>
    </>
  );
};
