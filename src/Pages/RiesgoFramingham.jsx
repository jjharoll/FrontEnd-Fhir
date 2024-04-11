import React, { useState } from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Select,
  Checkbox,
  Button,
} from '@chakra-ui/react';

const RiesgoFramingham = () => {
  const [formData, setFormData] = useState({
    edad: '',
    genero: 'masculino',
    colesterolTotal: '',
    colesterolHDL: '',
    presionArterial: '',
    fumador: false,
    diabetico: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para calcular el riesgo de Framingham
    console.log('Datos enviados para el cálculo:', formData);
    // Llama a la función de cálculo y muestra los resultados al usuario
  };

  return (
    <Box p={4}>
      <form onSubmit={handleSubmit}>
        <FormControl mb={4}>
          <FormLabel>Edad:</FormLabel>
          <Input
            type="number"
            name="edad"
            value={formData.edad}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Género:</FormLabel>
          <Select
            name="genero"
            value={formData.genero}
            onChange={handleChange}
          >
            <option value="masculino">Masculino</option>
            <option value="femenino">Femenino</option>
          </Select>
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Colesterol Total:</FormLabel>
          <Input
            type="number"
            name="colesterolTotal"
            value={formData.colesterolTotal}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Colesterol HDL:</FormLabel>
          <Input
            type="number"
            name="colesterolHDL"
            value={formData.colesterolHDL}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Presión Arterial:</FormLabel>
          <Input
            type="number"
            name="presionArterial"
            value={formData.presionArterial}
            onChange={handleChange}
          />
        </FormControl>
        <Checkbox
          name="fumador"
          isChecked={formData.fumador}
          onChange={handleChange}
        >
          Fumador
        </Checkbox>
        <Checkbox
          name="diabetico"
          isChecked={formData.diabetico}
          onChange={handleChange}
        >
          Diabético
        </Checkbox>
        <Button mt={4} colorScheme="blue" type="submit">
          Calcular Riesgo
        </Button>
      </form>
    </Box>
  );
};

export default RiesgoFramingham;
