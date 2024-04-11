import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  Select,
  Button,
  Checkbox,
  Text,
  Textarea,
  Flex
} from "@chakra-ui/react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Importa los estilos de react-toastify
import SignosVitales from "./SignosVitales";
import RiesgoFramingham from "./RiesgoFramingham";
import RiesgoFindrisc from "./RiesgoFindrisc";

const Calculadora = ({ handleSubmit }) => {
  const [formData, setFormData] = useState({
    patientSearchId: "",
    patientData: null,
    practitionerSearchId: "",
    practitionerData: null,
    peso: "",
    estatura: "",
  });
  const [showAssignButton, setShowAssignButton] = useState(false);
  const [imcData, setIMCData] = useState(null);
  const [imcInterpretation, setIMCInterpretation] = useState("");
  const [perimetroAbdominalData, setPerimetroAbdominalData] = useState(null);
  const [profesionalAsignado, setProfesionalAsignado] = useState(null);
  const [pacienteAsignado, setPacienteAsignado] = useState(null);
   const [showSignosVitales, setShowSignosVitales] = useState(false);
   const [showRiesgoFramingham, setShowRiesgoFramingham] = useState(false);
   const [showRiesgoFindrisc, setshowRiesgoFindrisc] = useState(false);



   const handleMostrarRiesgoFramingham = () => {
    setShowRiesgoFramingham(true);
  };
 
  const handleMostrarRiesgoFindrisc = () => {
    setshowRiesgoFindrisc(true);
  };

  
  const handleMostrarSignosVitales = () => {
    setShowSignosVitales(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handlePatientSearch = async () => {
    const { patientSearchId } = formData;
    if (!patientSearchId) {
      console.error("El ID del paciente no puede estar vacío.");
      return;
    }
    try {
      const response = await axios.get(
        `http://hapi.fhir.org/baseR4/Patient/${patientSearchId}`
      );
      console.log(response.data);
      setFormData((prevState) => ({
        ...prevState,
        patientData: JSON.stringify(response.data, null, 2), // Convertir a JSON con formato y espacio
      }));
      setShowAssignButton(true);
    } catch (error) {
      console.error("Error fetching patient data:", error);
    }
  };

  const handlePractitionerSearch = async () => {
    const { practitionerSearchId } = formData;
    if (!practitionerSearchId) {
      console.error(
        "El ID del profesional de salud no puede estar vacío."
      );
      return;
    }
    try {
      const response = await axios.get(
        `http://hapi.fhir.org/baseR4/Practitioner/${practitionerSearchId}`
      );
      console.log(response.data);
      setFormData((prevState) => ({
        ...prevState,
        practitionerData: JSON.stringify(response.data, null, 2), // Convertir a JSON con formato y espacio
        
      }));
      setShowAssignButton(true);
    } catch (error) {
      console.error("Error fetching practitioner data:", error);
    }
  };

  // Implementa la función para calcular el riesgo cardiovascular
  const calcularRiesgoFramingham = () => {
    // Aquí implementa la lógica para calcular el riesgo cardiovascular
    // Utiliza los datos ingresados en formData
    // Guarda el resultado y su interpretación en los estados correspondientes
  };

  const calcularRiesgoFindrisc = () => {
    // Aquí implementa la lógica para calcular el riesgo cardiovascular
    // Utiliza los datos ingresados en formData
    // Guarda el resultado y su interpretación en los estados correspondientes
  };

  const calculateIMC = () => {
    const { peso, estatura } = formData;
    if (!peso || !estatura) {
      console.error("El peso y la estatura son campos obligatorios.");
      return;
    }

    const pesoFloat = parseFloat(peso);
    const estaturaFloat = parseFloat(estatura) / 100; // Convertir estatura a metros
    const imc = pesoFloat / (estaturaFloat * estaturaFloat);
    let interpretation = "";
    if (imc < 18.5) {
      interpretation = "Bajo peso";
    } else if (imc >= 18.5 && imc < 25) {
      interpretation = "Normal";
    } else if (imc >= 25 && imc < 30) {
      interpretation = "Sobrepeso";
    } else {
      interpretation = "Obesidad";
    }
    const imcObservation = {
      resourceType: "Observation",
      id: "974d07a0-03c2-48bb-8c38-99f746604903",
      status: "final",
      category: [
        {
          coding: [
            {
              system: "http://terminology.hl7.org/CodeSystem/observation-category",
              code: "exam",
              display: "Exam"
            }
          ]
        }
      ],
      code: {
        coding: [
          {
            system: "http://loinc.org",
            code: "27113001",
            display: "peso corporal"
          }
        ]
      },
      subject: {
        reference: pacienteAsignado ? `Patient/${pacienteAsignado}` : "Patient/54ac308f-5964-4298-8f7c-93538db8a1f4"
      },
      effectiveDateTime: new Date().toISOString(),
      performer: [
        {
          reference: profesionalAsignado ? `Practitioner/${profesionalAsignado}` : "Practitioner/92d1c33d-169c-43dc-9fec-aad3f3ef3e26"
        }
      ],
      valueQuantity: {
        value: imc.toFixed(2),
        unit: "kg/m^2"
      },
      interpretation: [
        {
          coding: [
            {
              system: "http://terminology.hl7.org/CodeSystem/v3-ObservationInterpretation",
              code: interpretation === "Normal" ? "N" : "O",
              display: interpretation
            }
          ]
        }
      ]
    };

    setIMCData(imcObservation);
    setIMCInterpretation(`Su IMC es ${imc.toFixed(2)}: ${interpretation}`);
  };

  const handleAssign = () => {
    // Aquí puedes realizar la lógica para asignar el profesional al paciente
    // Puedes enviar los datos necesarios al backend o realizar otras operaciones
    console.log("Asignar");
  };
 
  const calculatePerimetroAbdominal = () => {
    const { perimetroAbdominal } = formData;
    if (!perimetroAbdominal) {
      console.error("El perímetro abdominal es un campo obligatorio.");
      return;
    }

    // Calcula el perímetro abdominal
    const perimetro = parseFloat(perimetroAbdominal);

    // Muestra un aviso con el resultado
    alert(`El perímetro abdominal calculado es: ${perimetro} cm`);

    // Crea el objeto Observation
    const perimetroAbdominalObservation = {
      resourceType: "Observation",
      id: "observacion-perimetro-abdominal",
      status: "final",
      category: [
        {
          coding: [
            {
              system:
                "http://terminology.hl7.org/CodeSystem/observation-category",
              code: "exam",
              display: "Exam",
            },
          ],
        },
      ],
      code: {
        coding: [
          {
            system: "http://loinc.org",
            code: "60621009",
            display: "Perimeter Abdominal",
          },
        ],
      },
      subject: {
        reference: `Patient/${pacienteAsignado}`,
      },
      effectiveDateTime: new Date().toISOString(),
      performer: [
        {
          reference: `Practitioner/${profesionalAsignado}`,
        },
      ],
      valueQuantity: {
        value: perimetro,
        unit: "cm",
      },
    };

    // Actualiza el estado para almacenar el objeto Observation del perímetro abdominal
    setPerimetroAbdominalData(perimetroAbdominalObservation);
  };

  const handleAssignPaciente = () => {
    try {
      // Parsear la cadena JSON del paciente
      const pacienteData = JSON.parse(formData.patientData);
      // Acceder al ID del paciente
      const pacienteId = pacienteData.id;
      console.log(pacienteId);
      toast.success(`Paciente Asignado correctamente:`);
      setPacienteAsignado(pacienteId);
    } catch (error) {
      console.error("Error parsing patient data:", error);
      toast.error("Error asignando paciente.");
    }
  };
    
  const handleAssignProfesional = () => {
    try {
      // Parsear la cadena JSON del profesional
      const profesionalData = JSON.parse(formData.practitionerData);
      // Acceder al ID del profesional
      const profesionalId = profesionalData.id;
      console.log(profesionalId);
      toast.success(`Profesional Asignado correctamente :`);
      setProfesionalAsignado(profesionalId);
    } catch (error) {
      console.error("Error parsing practitioner data:", error);
      toast.error("Error asignando profesional.");
    }
  };

  return (
    
    <Box textAlign="center" py={6}>
      <Heading as="h2" size="xl" mb={6}>
        Estilo de Vida Saludable
      </Heading>
      <form onSubmit={(e) => handleSubmit(e, formData)}>
        <Box maxW="md" m="auto">
        <FormControl id="patientSearchId" mb={4}>
            <FormLabel>Buscar paciente por ID</FormLabel>
            <Input
              type="text"
              name="patientSearchId"
              value={formData.patientSearchId}
              onChange={handleChange}
            />
          </FormControl>
          <Flex mb={4}>
            <Button
              colorScheme="blue"
              mr={2}
              onClick={handlePatientSearch}
            >
              Buscar Paciente
            </Button>
            {formData.patientData && (
              <Textarea
                value={formData.patientData}
                readOnly
                resize="vertical"
                flex="1"
              />
            )}
          </Flex>
          {showAssignButton && (
            <Button colorScheme="green" onClick={handleAssignPaciente} mb={4}>
              Asignar Paciente
            </Button>
          )}
            
          <FormControl id="practitionerSearchId" mb={4}>
            <FormLabel>Buscar profesional por ID</FormLabel>
            <Input
              type="text"
              name="practitionerSearchId"
              value={formData.practitionerSearchId}
              onChange={handleChange}
            />
          </FormControl>
          <Flex mb={4}>
            <Button
              colorScheme="blue"
              mr={2}
              onClick={handlePractitionerSearch}
            >
              Buscar Profesional
            </Button>
            {formData.practitionerData && (
              <Textarea
                value={formData.practitionerData}
                readOnly
                resize="vertical"
                flex="1"
              />
            )}
          </Flex>
          {showAssignButton && (
            <Button colorScheme="green" onClick={handleAssignProfesional} mb={4}>
              Asignar Profesional
            </Button>
          )}
            
          <FormControl id="peso" mb={4}>
            <FormLabel>Peso (kg)</FormLabel>
            <Input
              type="number"
              name="peso"
              value={formData.peso}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl id="estatura" mb={4}>
            <FormLabel>Estatura (cm)</FormLabel>
            <Input
              type="number"
              name="estatura"
              value={formData.estatura}
              onChange={handleChange}
            />
          </FormControl>
          {imcData && (
            <Textarea
              value={JSON.stringify(imcData, null, 2)}
              readOnly
              resize="vertical"
              mb={4}
            />
          )}
           {imcInterpretation && (
            <Text fontSize="lg" mb={4}>
              {imcInterpretation}
            </Text>
          )}
          <Button colorScheme="green" onClick={calculateIMC} mb={4}>
            Calcular IMC (Observation)
          </Button>
          <ToastContainer />
          <FormControl id="perimetroAbdominal" mb={4}>
            <FormLabel>Perímetro Abdominal (cm)</FormLabel>
            <Input
              type="number"
              name="perimetroAbdominal"
              value={formData.perimetroAbdominal}
              onChange={handleChange}
            />
          </FormControl>
          <Button
            colorScheme="green"
            onClick={calculatePerimetroAbdominal}
            mb={4}
          >
            Calcular Perímetro Abdominal (Observation)
          </Button>
          {perimetroAbdominalData && (
            <Textarea
              value={JSON.stringify(perimetroAbdominalData, null, 2)}
              readOnly
              resize="vertical"
              mb={4}
            />
          )}
          <FormControl id="valorTensionArterial" mb={4}>
            <FormLabel>Valor de tensión arterial</FormLabel>
            <Input
              type="text"
              name="valorTensionArterial"
              value={formData.valorTensionArterial}
              onChange={handleChange}
            />
          </FormControl>
          <Checkbox
            id="aceptoTerminos"
            name="aceptoTerminos"
            isChecked={formData.aceptoTerminos}
            onChange={handleChange}
            mb={4}
          >
            Acepto términos y condiciones
          </Checkbox>
          <Button colorScheme="blue" onClick={handleMostrarRiesgoFramingham} mb={4}>
            Calcular Riesgo Framingham
          </Button>
          <Button colorScheme="blue" onClick={handleMostrarRiesgoFindrisc}  mb={4}>
            Calcular Riesgo FINDRISC
          </Button>
          <Button colorScheme="blue" onClick={handleMostrarSignosVitales} mb={4}>
          PANEL DE SIGNOS VITALES
         </Button>
         {showRiesgoFindrisc && <RiesgoFindrisc />}
         
          {showRiesgoFramingham && <RiesgoFramingham />}
          {showSignosVitales && <SignosVitales />} {/* Muestra SignosVitales si showSignosVitales es true */}
          
        </Box>
      </form>
    </Box>
  );
};

export default Calculadora;
