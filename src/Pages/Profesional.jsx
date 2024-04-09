import React, { useState, useEffect } from "react";
import { Box, Heading, Button, Spinner, Alert, AlertIcon, SimpleGrid, Text, Center, FormControl, FormLabel, Input, Select } from "@chakra-ui/react"; // Importa los componentes necesarios de Chakra UI
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Importa los estilos de react-toastify
import axios from "axios";
      
const Profesional = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [professionals, setProfessionals] = useState([]);
  const [showForm, setShowForm] = useState(false); 
  const [showID, setshowID] = useState(false);
  const [searchId, setSearchId] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [newProfessional, setNewProfessional] = useState({
    nombre: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
    identificacion: "",
    telefono: "",
    email: "",
    genero: "",
    fechaNacimiento: "",
    tipoLicencia: "",
    numeroLicencia: "",
    especialidad: "",
    fechaInicioCalificacion: ""
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://hapi.fhir.org/baseR4/Practitioner");
      console.log(response.data.entry);
      setProfessionals(response.data.entry);
      setError("");
    } catch (error) {
      console.error("Error al obtener los profesionales:", error);
      setError("Ocurrió un error al obtener los profesionales. Por favor, inténtalo de nuevo más tarde.");
    } finally {
      setLoading(false);
    }
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProfessional({ ...newProfessional, [name]: value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Crear el recurso JSON con los datos del nuevo profesional
      const professionalResource = {
        resourceType: "Practitioner",
        identifier: [
          {
            use: "official",
            type: {
              coding: [
                {
                  system: "http://terminology.hl7.org/CodeSystem/v2-0203",
                  code: "NNCOL",
                  display: "National Person Identifier where the xxx is the ISO table 3166 3-character (alphabetic) country code"
                }
              ]
            },
            system: "urn:oid:2.16.170.3.899999040.1.4",
            value: newProfessional.identificacion
          }
        ],
        active: true,
        name: [
          {
            use: "official",
            given: [newProfessional.nombre],
            family: [newProfessional.apellidoPaterno, newProfessional.apellidoMaterno]
          }
        ],
        telecom: [
          {
            system: "phone",
            value: newProfessional.telefono,
            use: "home"
          },
          {
            system: "email",
            value: newProfessional.email
          }
        ],
        gender: newProfessional.genero,
        birthDate: newProfessional.fechaNacimiento,
        qualification: [
          {
            identifier: [
              {
                use: "official",
                type: {
                  coding: [
                    {
                      system: "http://terminology.hl7.org/CodeSystem/v2-0203",
                      code: "LN",
                      display: "License number"
                    }
                  ]
                },
                value: newProfessional.numeroLicencia
              }
            ],
            code: {
              coding: [
                {
                  system: "http://snomed.info/sct",
                  code: "5275007",
                  display: newProfessional.especialidad
                }
              ]
            },
            period: {
              start: newProfessional.fechaInicioCalificacion
            }
          }
        ]
      };

      // Enviar el recurso JSON al endpoint para crear un nuevo profesional
      const response = await axios.post("http://hapi.fhir.org/baseR4/Practitioner", professionalResource); 
      toast.success(`Profesional creado con ID: ${response.data.id}`);
      console.log("Profesional creado:", response.data);
      setError("");
    } catch (error) {
      console.error("Error al crear profesional:", error);
      setError("Ocurrió un error al crear el profesional. Por favor, inténtalo de nuevo más tarde.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearchById = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://hapi.fhir.org/baseR4/Practitioner/${searchId}`);
      console.log(response.data);
      setSearchResult(response.data);
      setError("");
    } catch (error) {
      console.error("Error al buscar profesional por ID:", error);
      setError("Ocurrió un error al buscar el profesional por ID. Por favor, inténtalo de nuevo más tarde.");
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload2 = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setLoading(true);
      const reader = new FileReader();
      reader.onload = async () => {
        const arrayBuffer = reader.result;
        try {
          // Enviar el ArrayBuffer al endpoint
          const response = await axios.post("http://hapi.fhir.org/baseR4/Practitioner", arrayBuffer, {
            headers: {
              'Content-Type': 'application/json'
            }
          });
          console.log("File uploaded successfully:", response.data);

          // Procesar la respuesta como sea necesario
          toast.success(`Profesional creado con ID: ${response.data.id}`);
        } catch (error) {
          console.error("Error uploading file:", error);
          setError("Ocurrió un error al cargar el recurso Fhir. Por favor, inténtalo de nuevo más tarde 1.");
        } finally {
          setLoading(false);
        }
      };
      reader.readAsArrayBuffer(file);
    } catch (error) {
      console.error("Error uploading file:", error);
      setError("Ocurrió un error al cargar el recurso Fhir. Por favor, inténtalo de nuevo más tarde 2.");
      setLoading(false);
    }
  };

     
        return (
          <Box id="Profesional" textAlign="center" py={10}>
            <Heading as="h1" size="2xl" mb={6}>
              Profesional de Salud
            </Heading>
      
            {/* Botón para mostrar/ocultar el formulario */}
            <Button colorScheme="blue" mb={4} onClick={() => setShowForm(!showForm)}>
              {showForm ? "Ocultar Formulario" : "Crear Profesional"}
            </Button>
      
            {/* Botón para ver los profesionales */}
            <Button colorScheme="green" mb={4} onClick={fetchData}>
              Ver Profesionales
            </Button>

            {/* Botón para mostrar/ocultar el formulario */}
            <Button colorScheme="blue" mb={4} onClick={() => setshowID(!showID)}>
              {showID ? "Ocultar Formulario" : "Buscar Profesional ID"}
            </Button>
            <Button colorScheme="green" mb={4} as="label" htmlFor="file-upload2">
        Cargar Recurso Fhir (JSON)
        <input id="file-upload2" type="file" accept=".json" onChange={handleFileUpload2} style={{ display: 'none' }} />
      </Button>
            <label htmlFor="file-upload3">
        <Button colorScheme="blue" mb={4} as="span">
          Cargar Profesionales (xlsx, xls, csv)
        </Button>
      </label>
      <input id="file-upload3" type="file" accept=".xls, .xlsx, .csv" onChange={handleFileUpload2} style={{ display: 'none' }} />

            <ToastContainer />
            
      {showForm && (
        <form onSubmit={handleSubmit}>
          <FormControl id="nombre" mb={4}>
            <FormLabel>Nombre</FormLabel>
            <Input type="text" name="nombre" value={newProfessional.nombre} onChange={handleInputChange} />
          </FormControl>
          <FormControl id="apellidoPaterno" mb={4}>
            <FormLabel>Apellido Paterno</FormLabel>
            <Input type="text" name="apellidoPaterno" value={newProfessional.apellidoPaterno} onChange={handleInputChange} />
          </FormControl>
          <FormControl id="apellidoMaterno" mb={4}>
            <FormLabel>Apellido Materno</FormLabel>
            <Input type="text" name="apellidoMaterno" value={newProfessional.apellidoMaterno} onChange={handleInputChange} />
          </FormControl>
          <FormControl id="identificacion" mb={4}>
            <FormLabel>Identificación</FormLabel>
            <Input type="text" name="identificacion" value={newProfessional.identificacion} onChange={handleInputChange} />
          </FormControl>
          <FormControl id="telefono" mb={4}>
            <FormLabel>Teléfono</FormLabel>
            <Input type="tel" name="telefono" value={newProfessional.telefono} onChange={handleInputChange} />
          </FormControl>
          <FormControl id="email" mb={4}>
            <FormLabel>Email</FormLabel>
            <Input type="email" name="email" value={newProfessional.email} onChange={handleInputChange} />
          </FormControl>
          <FormControl id="genero" mb={4}>
            <FormLabel>Género</FormLabel>
            <Select name="genero" value={newProfessional.genero} onChange={handleInputChange}>
              <option value="male">Masculino</option>
              <option value="female">Femenino</option>
              <option value="other">Otro</option>
            </Select>
          </FormControl>
          <FormControl id="fechaNacimiento" mb={4}>
            <FormLabel>Fecha de Nacimiento</FormLabel>
            <Input type="date" name="fechaNacimiento" value={newProfessional.fechaNacimiento} onChange={handleInputChange} />
          </FormControl>
          <FormControl id="tipoLicencia" mb={4}>
            <FormLabel>Tipo de Licencia</FormLabel>
            <Input type="text" name="tipoLicencia" value={newProfessional.tipoLicencia} onChange={handleInputChange} />
          </FormControl>
          <FormControl id="numeroLicencia" mb={4}>
            <FormLabel>Número de Licencia</FormLabel>
            <Input type="text" name="numeroLicencia" value={newProfessional.numeroLicencia} onChange={handleInputChange} />
          </FormControl>
          <FormControl id="especialidad" mb={4}>
            <FormLabel>Especialidad</FormLabel>
            <Input type="text" name="especialidad" value={newProfessional.especialidad} onChange={handleInputChange} />
          </FormControl>
          <FormControl id="fechaInicioCalificacion" mb={4}>
            <FormLabel>Fecha de Inicio de la Calificación</FormLabel>
            <Input type="date" name="fechaInicioCalificacion" value={newProfessional.fechaInicioCalificacion} onChange={handleInputChange} />
          </FormControl>
          <Button type="submit" colorScheme="green" mr={4}>Guardar</Button>
        </form>
      )}
      
      {showID && (
        <FormControl id="searchId" mb={4}>
        <FormLabel>Buscar Profesional por ID</FormLabel>
        <Input type="text" value={searchId} onChange={(e) => setSearchId(e.target.value)} />
        <Button colorScheme="teal" onClick={handleSearchById} mt={2}>Buscar</Button>
      </FormControl>
      )}
      
            {loading && (
              // Muestra un spinner mientras se cargan los datos
              <Center mt={8}>
                <Spinner size="xl" />
              </Center>
            )}
      
            {error && (
              // Muestra un mensaje de error si hay un error al cargar los profesionales
              <Alert status="error" mt={8}>
                <AlertIcon />
                {error}
              </Alert>
            )}

{searchResult && (
  <Box borderWidth="1px" borderRadius="lg" p={4} mt={8}>
    <Heading as="h3" size="md" mb={2}>
      {searchResult.name[0]?.given?.join(" ")}
    </Heading>
    <Text>Apellido Paterno: {searchResult.name[0]?.family?.[0]}</Text>
    <Text>Apellido Materno: {searchResult.name[0]?.family?.[1]}</Text>
    <Text>Identificación: {searchResult.identifier?.[0]?.value}</Text>
    <Text>Teléfono: {searchResult.telecom?.[0]?.value}</Text>
    <Text>Email: {searchResult.telecom?.[1]?.value}</Text>
    <Text>Género: {searchResult.gender}</Text>
    <Text>Fecha de Nacimiento: {searchResult.birthDate}</Text>
    <Text>Especialidad: {searchResult.qualification?.[0]?.code?.coding?.[0]?.display}</Text>
    <Text>Inicio de Calificación: {searchResult.qualification?.[0]?.period?.start}</Text>
  </Box>
)}
            {/* Muestra las tarjetas de los profesionales */}
            {professionals.length > 0 && (
              <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={6} mt={8}>
                {professionals.map((professional, index) => (
                  <Box key={index} borderWidth="1px" borderRadius="lg" p={4}>
                    <Heading as="h3" size="md" mb={2}>
                      {professional.resource.name[0].given[0]}
                    </Heading>
                    <Text>Apellido Paterno: {professional.resource.name[0].family[0]}</Text>
                    <Text>Apellido Materno: {professional.resource.name[0].family[1]}</Text>
                    <Text>Identificación: {professional.resource.identifier[0].value}</Text>
                    <Text>Teléfono: {professional.resource.telecom[0].value}</Text>
                    <Text>Email: {professional.resource.telecom[1].value}</Text>
                    <Text>Género: {professional.resource.gender}</Text>
                    <Text>Fecha de Nacimiento: {professional.resource.birthDate}</Text>
                    <Text>Especialidad: {professional.resource.qualification[0].code.coding[0].display}</Text>
                    <Text>Inicio de Calificación: {professional.resource.qualification[0].period.start}</Text>
                  </Box>
                ))}
              </SimpleGrid>
            )}
          </Box>

          
        );
      };
      
      export default Profesional;
      