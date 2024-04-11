import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { toast } from "react-toastify";
import { buildBundle } from "./buildBundle";

const SignosVitales = () => {
  const [values, setValues] = useState({
    "FrecuenciaCardiaca": "",
    "PresionSanguinea": "",
    "FrecuenciaRespiratoria": "",
    "TemperaturaCorporal": "",
  });

  const [additionalNotes, setAdditionalNotes] = useState("");
  const [showAdditionalNotes, setShowAdditionalNotes] = useState(false);
  const [generatedBundle, setGeneratedBundle] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleNotesChange = (e) => {
    setAdditionalNotes(e.target.value);
  };

  const handleSubmit = () => {
    const incompleteValues = Object.entries(values).filter(([key, value]) => !value);
    if (incompleteValues.length > 0) {
      const missingFields = incompleteValues.map(([key]) => key).join(", ");
      toast.error(`Por favor complete todos los campos (${missingFields}).`);
      return;
    }
    
    const bundle = buildBundle(values, additionalNotes);
    setGeneratedBundle(JSON.stringify(bundle, null, 2));
    
    toast.success("Signos vitales registrados exitosamente.");
    
    setValues({
      "FrecuenciaCardiaca": "",
      "PresionSanguinea": "",
      "FrecuenciaRespiratoria": "",
      "TemperaturaCorporal": "",
    });
    setAdditionalNotes("");
  };

  return (
    <Box py={6}>
      <h2>Panel de Signos Vitales</h2>
      <Flex direction="column">
        {Object.entries(values).map(([key, value]) => (
          <FormControl key={key} id={key.replace(/ /g, "_")} my={4}>
            <FormLabel>{key}</FormLabel>
            <Input
              type="text"
              name={key}
              value={value}
              onChange={handleChange}
            />
          </FormControl>
        ))}
        <Button
          colorScheme="blue"
          onClick={() => setShowAdditionalNotes(!showAdditionalNotes)}
          mt={4}
        >
          {showAdditionalNotes ? "Ocultar Notas Adicionales" : "Agregar Notas Adicionales"}
        </Button>
        {showAdditionalNotes && (
          <FormControl id="notas_adicionales" mt={4}>
            <FormLabel>Notas Adicionales</FormLabel>
            <Textarea
              value={additionalNotes}
              onChange={handleNotesChange}
              size="sm"
            />
          </FormControl>
        )}
      </Flex>
      <Button colorScheme="blue" onClick={handleSubmit} mt={4}>
        Registrar
      </Button>

      {/* Mostrar el JSON generado con formato */}
      {generatedBundle && (
        <Box mt={6}>
          <h3>Bundle Generado:</h3>
          <Textarea
            value={generatedBundle}
            readOnly
            rows={10}
            size="sm"
            style={{ resize: "vertical" }} // Ajusta el tamaño verticalmente
          />
        </Box>
      )}
    </Box>
  );
};

export default SignosVitales;
