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

const RiesgoFindrisk = () => {
  const [formData, setFormData] = useState({
    edad: '',
    imc: '',
    circunferenciaCintura: '',
    actividadFisica: '',
    consumoFrutasVerduras: '',
    hipertension: false,
    hiperglucemia: false,
    medicacionHiperglucemia: false,
    altaGlucosa: false,
    antecedentesFamiliaresDiabetes: false,
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
    // Lógica para calcular el riesgo de FINDRISC
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
          <FormLabel>Índice de Masa Corporal (IMC):</FormLabel>
          <Input
            type="number"
            name="imc"
            value={formData.imc}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Circunferencia de la Cintura:</FormLabel>
          <Input
            type="number"
            name="circunferenciaCintura"
            value={formData.circunferenciaCintura}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Nivel de Actividad Física:</FormLabel>
          <Select
            name="actividadFisica"
            value={formData.actividadFisica}
            onChange={handleChange}
          >
            <option value="bajo">Bajo</option>
            <option value="moderado">Moderado</option>
            <option value="alto">Alto</option>
          </Select>
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Consumo de Frutas y Verduras:</FormLabel>
          <Input
            type="number"
            name="consumoFrutasVerduras"
            value={formData.consumoFrutasVerduras}
            onChange={handleChange}
          />
        </FormControl>
        <Checkbox
          name="hipertension"
          isChecked={formData.hipertension}
          onChange={handleChange}
        >
          Historial de Hipertensión
        </Checkbox>
        <Checkbox
          name="hiperglucemia"
          isChecked={formData.hiperglucemia}
          onChange={handleChange}
        >
          Historial de Hiperglucemia
        </Checkbox>
        <Checkbox
          name="medicacionHiperglucemia"
          isChecked={formData.medicacionHiperglucemia}
          onChange={handleChange}
        >
          Historial de Medicación para Hiperglucemia
        </Checkbox>
        <Checkbox
          name="altaGlucosa"
          isChecked={formData.altaGlucosa}
          onChange={handleChange}
        >
          Historial de Alta Glucosa Sanguínea
        </Checkbox>
        <Checkbox
          name="antecedentesFamiliaresDiabetes"
          isChecked={formData.antecedentesFamiliaresDiabetes}
          onChange={handleChange}
        >
          Antecedentes Familiares de Diabetes
        </Checkbox>
        <Button mt={4} colorScheme="blue" type="submit">
          Calcular Riesgo
        </Button>
      </form>
    </Box>
  );
};

export default RiesgoFindrisk;
