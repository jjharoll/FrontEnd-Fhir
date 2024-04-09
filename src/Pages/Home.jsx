
import React from "react";
import { Box, Heading, Text, Button, Image } from "@chakra-ui/react"; // Importa los componentes necesarios de Chakra UI

const Home = () => {
  return (
    <Box id="Home" textAlign="center" py={10}>
      <div style={{ display: "flex", justifyContent: "center" }}> {/* Contenedor flexbox para centrar la imagen */}
        <Image src="https://images.squarespace-cdn.com/content/v1/59bc3457ccc5c5890fe7cacd/1619204243316-8EME7OPSNDNOICX4Q8GQ/fhir-5808d98a.png" alt="Banner de HL7 FHIR" mb={8} /> {/* Utiliza una imagen como banner */}
      </div>
      <Heading as="h1" size="2xl" mb={6}>
        Gestiona datos de salud con HL7 FHIR
      </Heading>
      <Text fontSize="xl" mb={8}>
        Simplifica la integración y el intercambio de datos de pacientes con nuestra plataforma basada en HL7 FHIR.
      </Text>
      <Button colorScheme="blue" size="lg" mr={4}>Calculadora</Button> {/* Hacer los botones más grandes */}
      <Button colorScheme="green" size="lg">Ver Agenda de Citas</Button>
      {/* Agrega más botones u enlaces según sea necesario */}
      <Text mt={8} fontSize="lg" fontStyle="italic">
        "Con HL7 FHIR, estamos transformando la forma en que se gestionan los datos de salud." - [Desarrollador/Jharol Andres Perez]
      </Text>
    </Box>
  );
};

export default Home;
