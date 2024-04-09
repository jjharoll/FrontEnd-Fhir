import React, { useState } from "react";
import {
  Box,
  Heading,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  VStack,
  StackDivider,
  SimpleGrid,
  Center,
  Spinner,
  Alert,
  AlertIcon,
  Text
} from "@chakra-ui/react"; // Importa los componentes necesarios de Chakra UI
import axios from "axios"; // Importa axios para realizar solicitudes HTTP
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Importa los estilos de react-toastify

const Paciente = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showBuscarID, setshowBuscarID] = useState(false);
  const [newPatient, setNewPatient] = useState({
    nombre: "",
    fechaNacimiento: "",
    tipoIdentificacion: "",
    numeroIdentificacion: "",
    numeroTelefono: "",
    sexo: "",
    direccion: ""
  });
  const [loading, setLoading] = useState(false);
  const [patients, setPatients] = useState([]);
  const [error, setError] = useState("");
  const [searchId, setSearchId] = useState("");
  const [searchedPatient, setSearchedPatient] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPatient({ ...newPatient, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Crear el recurso JSON con los datos del nuevo paciente
      const patientResource = {
        resourceType: "Patient",
        name: [
          {
            given: [newPatient.nombre]
          }
        ],
        birthDate: newPatient.fechaNacimiento,
        gender: newPatient.sexo,
        telecom: [
          {
            system: "phone",
            value: newPatient.numeroTelefono
          }
        ],
        address: [
          {
            text: newPatient.direccion
          }
        ]
      };

      // Enviar el recurso JSON al endpoint para crear un nuevo paciente
      const response = await axios.post("http://hapi.fhir.org/baseR4/Patient", patientResource);
      toast.success(`Paciente creado con ID: ${response.data.id}`);
      console.log("Paciente creado:", response.data);
      setError("");
    } catch (error) {
      console.error("Error al crear paciente:", error);
      setError("Ocurrió un error al crear el paciente. Por favor, inténtalo de nuevo más tarde.");
    } finally {
      setLoading(false);
    }
  };

  const handleBuscarPaciente = async () => {
    setLoading(true);
    try {
      // Realizar la solicitud para buscar el paciente por su ID
      const response = await axios.get(`http://hapi.fhir.org/baseR4/Patient/${searchId}`);
      console.log(response.data);
      setSearchedPatient(response.data);
      setError("");
    } catch (error) {
      console.error("Error al buscar paciente:", error);
      setError("Ocurrió un error al buscar el paciente. Por favor, inténtalo de nuevo más tarde.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerPacientes = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://hapi.fhir.org/baseR4/Patient");
      setPatients(response.data.entry);
      setError("");
    } catch (error) {
      console.error("Error al obtener pacientes:", error);
      setError("Ocurrió un error al obtener pacientes. Por favor, inténtalo de nuevo más tarde.");
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setLoading(true);
      const reader = new FileReader();
      reader.onload = async () => {
        const arrayBuffer = reader.result;
        try {
          // Enviar el ArrayBuffer al endpoint
          const response = await axios.post("http://hapi.fhir.org/baseR4/Patient", arrayBuffer, {
            headers: {
              'Content-Type': 'application/json'
            }
          });
          console.log("File uploaded successfully:", response.data);

          // Procesar la respuesta como sea necesario
          toast.success(`Paciente creado con ID: ${response.data.id}`);
        } catch (error) {
          console.error("Error uploading file:", error);
          setError("Ocurrió un error al cargar el recurso Fhir. Por favor, inténtalo de nuevo más tarde.");
        } finally {
          setLoading(false);
        }
      };
      reader.readAsArrayBuffer(file);
    } catch (error) {
      console.error("Error uploading file:", error);
      setError("Ocurrió un error al cargar el recurso Fhir. Por favor, inténtalo de nuevo más tarde.");
      setLoading(false);
    }
  };
  

  return (
    <Box id="Paciente" textAlign="center" py={10}>
      <Heading as="h1" size="2xl" mb={6}>
        Paciente
      </Heading>
      <Button colorScheme="blue" mb={4} onClick={() => setShowCreateForm(true)}>Crear Paciente</Button>
      <Button colorScheme="green" mb={4} onClick={handleVerPacientes}>Ver Pacientes</Button>
      <Button colorScheme="blue" mb={4} onClick={() => setshowBuscarID(true)}>Buscar Paciente ID </Button>
      <Button colorScheme="green" mb={4} as="label" htmlFor="file-upload">
        Cargar Recurso Fhir (JSON)
        <input id="file-upload" type="file" accept=".json" onChange={handleFileUpload} style={{ display: 'none' }} />
      </Button>
      <label htmlFor="file-upload">
        <Button colorScheme="blue" mb={4} as="span">
          Cargar Pacientes (xlsx, xls, csv)
        </Button>
      </label>
      <input id="file-upload" type="file" accept=".xls, .xlsx, .csv" onChange={handleFileUpload} style={{ display: 'none' }} />
      {showBuscarID && (
      <FormControl id="buscarPaciente" mb={4}>
        <FormLabel>Buscar Paciente por ID</FormLabel>
        <Input type="text" value={searchId} onChange={(e) => setSearchId(e.target.value)} />
        <Button colorScheme="teal" mt={2} onClick={handleBuscarPaciente}>Buscar</Button>
      </FormControl>
      )}
      <ToastContainer />
      {showCreateForm && (
        // Formulario para crear un nuevo paciente
        <form onSubmit={handleSubmit}>
          <FormControl id="nombre" mb={4}>
            <FormLabel>Nombre</FormLabel>
            <Input type="text" name="nombre" value={newPatient.nombre} onChange={handleInputChange} />
          </FormControl>
          <FormControl id="fechaNacimiento" mb={4}>
            <FormLabel>Fecha de Nacimiento</FormLabel>
            <Input type="date" name="fechaNacimiento" value={newPatient.fechaNacimiento} onChange={handleInputChange} />
          </FormControl>
          <FormControl id="tipoIdentificacion" mb={4}>
            <FormLabel>Tipo de Identificación</FormLabel>
            <Select name="tipoIdentificacion" value={newPatient.tipoIdentificacion} onChange={handleInputChange}>
              <option value="dni">DNI</option>
              <option value="pasaporte">Pasaporte</option>
              {/* Agrega más opciones según sea necesario */}
            </Select>
          </FormControl>
          <FormControl id="numeroIdentificacion" mb={4}>
            <FormLabel>Número de Identificación</FormLabel>
            <Input type="text" name="numeroIdentificacion" value={newPatient.numeroIdentificacion} onChange={handleInputChange} />
          </FormControl>
          <FormControl id="numeroTelefono" mb={4}>
            <FormLabel>Número de Teléfono</FormLabel>
            <Input type="tel" name="numeroTelefono" value={newPatient.numeroTelefono} onChange={handleInputChange} />
          </FormControl>
          <FormControl id="sexo" mb={4}>
            <FormLabel>Sexo</FormLabel>
            <Select name="sexo" value={newPatient.sexo} onChange={handleInputChange}>
              <option value="masculino">Masculino</option>
              <option value="femenino">Femenino</option>
              <option value="otro">Otro</option>
            </Select>
          </FormControl>
          <FormControl id="direccion" mb={4}>
            <FormLabel>Dirección</FormLabel>
            <Textarea name="direccion" value={newPatient.direccion} onChange={handleInputChange} />
          </FormControl>
          <Button type="submit" colorScheme="green" mr={4}>Guardar</Button>
          <Button onClick={() => setShowCreateForm(false)}>Cancelar</Button>
        </form>
      )}

{searchedPatient && (
        <Box borderWidth="1px" borderRadius="lg" p={4} mt={4}>
          <Heading as="h3" size="md" mb={2}>
            {searchedPatient.name && searchedPatient.name[0] && searchedPatient.name[0].text}
          </Heading>
          <Text fontSize="sm" mb={2}>ID: {searchedPatient.id}</Text>
          <Text fontSize="sm" mb={2}>Nombre: {searchedPatient.name && searchedPatient.name[0] && searchedPatient.name[0].text}</Text>
          <Text fontSize="sm" mb={2}>Fecha de Nacimiento: {searchedPatient.birthDate}</Text>
          <Text fontSize="sm" mb={2}>Dirección: {searchedPatient.address && searchedPatient.address[0] && searchedPatient.address[0].text}</Text>
          <Text fontSize="sm" mb={2}>Teléfono: {searchedPatient.telecom && searchedPatient.telecom[0] && searchedPatient.telecom[0].value}</Text>
        </Box>
      )}

      {loading && (
        // Muestra un spinner mientras se cargan los datos
        <Center mt={8}>
          <Spinner size="xl" />
        </Center>
      )}

      {error && (
        // Muestra un mensaje de error si hay un error al obtener los pacientes
        <Alert status="error" mt={8}>
          <AlertIcon />
          {error}
        </Alert>
      )}

      {patients.length > 0 && (
        // Muestra las tarjetas de los pacientes
        <SimpleGrid columns={[1, 2, 3]} spacing={4} mt={8}>
          {patients.map((patient, index) => (
            <Box key={index} borderWidth="1px" borderRadius="lg" p={4}>
              <Heading as="h3" size="md" mb={2}>
                {patient.resource.name && patient.resource.name[0] && patient.resource.name[0].text}
              </Heading>
              <Text fontSize="sm" mb={2}>ID: {patient.resource.id}</Text>
              {/* Agregar más detalles del paciente según sea necesario */}
            </Box>
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
};

export default Paciente;
