export const buildBundle = (formData) => {
    console.log(formData);
    const bundle = {
        "resourceType": "Bundle",
        "type": "transaction",
        "entry": [
            {
                "resource": {
                    "resourceType": "Composition",
                    "identifier": {
                        "value": "DOC-a2d6a8470bad"
                    },
                    "status": "final",
                    "type": {
                        "coding": [
                            {
                                "system": "http://loinc.org",
                                "code": "8716-3",
                                "display": "Vital signs, physical findings"
                            }
                        ]
                    },
                    "category": [
                        {
                            "coding": [
                                {
                                    "system": "http://loinc.org",
                                    "code": "69459-6",
                                    "display": "Care record summary panel"
                                }
                            ]
                        }
                    ],
                    "subject": {
                        "reference": "Patient/2a9e6894-c6e5-43fc-8b5b-e6165b0703bb"
                    },
                    "date": "2022-04-17T09:25:58-05:00",
                    "author": [
                        {
                            "reference": "Practitioner/92d1c33d-169c-43dc-9fec-aad3f3ef3e26"
                        }
                    ],
                    "title": "PANEL DE SIGNOS VITALES",
                    "confidentiality": "R",
                    "attester": [
                        {
                            "mode": "professional",
                            "time": "2022-04-17T09:25:58-05:00",
                            "party": {
                                "reference": "Practitioner/92d1c33d-169c-43dc-9fec-aad3f3ef3e26"
                            }
                        }
                    ],
                    "custodian": {
                        "reference": "Organization/1733f196-2c8a-484f-b874-13396990b69d"
                    },
                    "section": [
                        {
                            "title": "SIGNOS VITALES",
                            "code": {
                                "coding": [
                                    {
                                        "system": "http://loinc.org",
                                        "code": "8716-3",
                                        "display": "Vital signs"
                                    }
                                ]
                            },
                            "entry": [
                                {
                                    "reference": "#frecuenciaCardiaca"
                                },
                                {
                                    "reference": "#presionSanguinea"
                                },
                                {
                                    "reference": "#frecuenciaRespiratoria"
                                },
                                {
                                    "reference": "#temperaturaCorporal"
                                }
                            ]
                        }
                    ]
                },
                "request": {
                    "method": "POST",
                    "url": "https://hl7co-cdr.fhir.azurehealthcareapis.com/Composition/"
                }
            },
            {
                "resource": {
                    "resourceType": "Observation",
                    "id": "frecuenciaCardiaca",
                    "status": "final",
                    "category": [
                        {
                            "coding": [
                                {
                                    "system": "http://terminology.hl7.org/CodeSystem/observation-category",
                                    "code": "vital-signs",
                                    "display": "Vital Signs"
                                }
                            ]
                        }
                    ],
                    "code": {
                        "coding": [
                            {
                                "system": "http://loinc.org",
                                "code": "364075005",
                                "display": "frecuencia cardíaca"
                            }
                        ]
                    },
                    "subject": {
                        "reference": "Patient/2a9e6894-c6e5-43fc-8b5b-e6165b0703bb"
                    },
                    "effectiveDateTime": "2022-04-17T09:30:23-05:00",
                    "performer": [
                        {
                            "reference": "Practitioner/92d1c33d-169c-43dc-9fec-aad3f3ef3e26"
                        }
                    ],
                    "valueQuantity": {
                        "value": formData.FrecuenciaCardiaca,
                        "unit": "LPM"
                    },
                    "interpretation": [
                        {
                            "coding": [
                                {
                                    "system": "http://terminology.hl7.org/CodeSystem/v3-ObservationInterpretation",
                                    "code": "N",
                                    "display": "Normal"
                                }
                            ]
                        }
                    ],
                    "referenceRange": [
                        {
                            "low": {
                                "value": 60,
                                "unit": "LPM"
                            },
                            "high": {
                                "value": 100,
                                "unit": "LPM"
                            }
                        }
                    ]
                },
                "request": {
                    "method": "POST",
                    "url": "https://hl7co-cdr.fhir.azurehealthcareapis.com/Observation/"
                }
            },
            {
                "resource": {
                    "resourceType": "Observation",
                    "id": "presionSanguinea",
                    "status": "final",
                    "category": [
                        {
                            "coding": [
                                {
                                    "system": "http://terminology.hl7.org/CodeSystem/observation-category",
                                    "code": "vital-signs",
                                    "display": "Vital Signs"
                                }
                            ]
                        }
                    ],
                    "code": {
                        "coding": [
                            {
                                "system": "http://loinc.org",
                                "code": "75367002",
                                "display": "presión sanguínea"
                            }
                        ]
                    },
                    "subject": {
                        "reference": "Patient/2a9e6894-c6e5-43fc-8b5b-e6165b0703bb"
                    },
                    "effectiveDateTime": "2022-04-17T09:30:23-05:00",
                    "performer": [
                        {
                            "reference": "Practitioner/92d1c33d-169c-43dc-9fec-aad3f3ef3e26"
                        }
                    ],
                    "component": [
                        {
                            "code": {
                                "coding": [
                                    {
                                        "system": "http://loinc.org",
                                        "code": "271649006",
                                        "display": "presión sistólica"
                                    }
                                ]
                            },
                            "valueQuantity": {
                                "value": formData.PresionSanguinea,
                                "unit": "mmHg"
                            },
                            "interpretation": [
                                {
                                    "coding": [
                                        {
                                            "system": "http://terminology.hl7.org/CodeSystem/v3-ObservationInterpretation",
                                            "code": "N",
                                            "display": "Normal"
                                        }
                                    ]
                                }
                            ],
                            "referenceRange": [
                                {
                                    "low": {
                                        "value": 90,
                                        "unit": "mmHg"
                                    },
                                    "high": {
                                        "value": 120,
                                        "unit": "mmHg"
                                    }
                                }
                            ]
                        },
                        {
                            "code": {
                                "coding": [
                                    {
                                        "system": "http://loinc.org",
                                        "code": "271650006",
                                        "display": "presión diastólica"
                                    }
                                ]
                            },
                            "valueQuantity": {
                                "value": 70,
                                "unit": "mmHg"
                            },
                            "interpretation": [
                                {
                                    "coding": [
                                        {
                                            "system": "http://terminology.hl7.org/CodeSystem/v3-ObservationInterpretation",
                                            "code": "N",
                                            "display": "Normal"
                                        }
                                    ]
                                }
                            ],
                            "referenceRange": [
                                {
                                    "low": {
                                        "value": 60,
                                        "unit": "mmHg"
                                    },
                                    "high": {
                                        "value": 80,
                                        "unit": "mmHg"
                                    }
                                }
                            ]
                        }
                    ]
                },
                "request": {
                    "method": "POST",
                    "url": "https://hl7co-cdr.fhir.azurehealthcareapis.com/Observation/"
                }
            },
            {
                "resource": {
                    "resourceType": "Observation",
                    "id": "frecuenciaRespiratoria",
                    "status": "final",
                    "category": [
                        {
                            "coding": [
                                {
                                    "system": "http://terminology.hl7.org/CodeSystem/observation-category",
                                    "code": "vital-signs",
                                    "display": "Vital Signs"
                                }
                            ]
                        }
                    ],
                    "code": {
                        "coding": [
                            {
                                "system": "http://loinc.org",
                                "code": "86290005",
                                "display": "frecuencia respiratoria"
                            }
                        ]
                    },
                    "subject": {
                        "reference": "Patient/2a9e6894-c6e5-43fc-8b5b-e6165b0703bb"
                    },
                    "effectiveDateTime": "2022-04-17T09:30:23-05:00",
                    "performer": [
                        {
                            "reference": "Practitioner/92d1c33d-169c-43dc-9fec-aad3f3ef3e26"
                        }
                    ],
                    "valueQuantity": {
                        "value": formData.FrecuenciaRespiratoria,
                        "unit": "RPM"
                    },
                    "interpretation": [
                        {
                            "coding": [
                                {
                                    "system": "http://terminology.hl7.org/CodeSystem/v3-ObservationInterpretation",
                                    "code": "N",
                                    "display": "Normal"
                                }
                            ]
                        }
                    ],
                    "referenceRange": [
                        {
                            "low": {
                                "value": 12,
                                "unit": "RPM"
                            },
                            "high": {
                                "value": 18,
                                "unit": "RPM"
                            }
                        }
                    ]
                },
                "request": {
                    "method": "POST",
                    "url": "https://hl7co-cdr.fhir.azurehealthcareapis.com/Observation/"
                }
            },
            {
                "resource": {
                    "resourceType": "Observation",
                    "id": "temperaturaCorporal",
                    "status": "final",
                    "category": [
                        {
                            "coding": [
                                {
                                    "system": "http://terminology.hl7.org/CodeSystem/observation-category",
                                    "code": "vital-signs",
                                    "display": "Vital Signs"
                                }
                            ]
                        }
                    ],
                    "code": {
                        "coding": [
                            {
                                "system": "http://loinc.org",
                                "code": "386725007",
                                "display": "temperatura corporal"
                            }
                        ]
                    },
                    "subject": {
                        "reference": "Patient/2a9e6894-c6e5-43fc-8b5b-e6165b0703bb"
                    },
                    "effectiveDateTime": "2022-04-17T09:30:23-05:00",
                    "performer": [
                        {
                            "reference": "Practitioner/92d1c33d-169c-43dc-9fec-aad3f3ef3e26"
                        }
                    ],
                    "valueQuantity": {
                        "value": formData.TemperaturaCorporal,
                        "unit": "ºC"
                    },
                    "interpretation": [
                        {
                            "coding": [
                                {
                                    "system": "http://terminology.hl7.org/CodeSystem/v3-ObservationInterpretation",
                                    "code": "N",
                                    "display": "Normal"
                                }
                            ]
                        }
                    ],
                    "referenceRange": [
                        {
                            "low": {
                                "value": 36.5,
                                "unit": "ºC"
                            },
                            "high": {
                                "value": 37.3,
                                "unit": "ºC"
                            }
                        }
                    ]
                },
                "request": {
                    "method": "POST",
                    "url": "https://hl7co-cdr.fhir.azurehealthcareapis.com/Observation/"
                }
            }
        ]
    }

    
    return bundle;
  };
  