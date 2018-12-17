import { Component, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { TagWrapper, enumTagWrapperContext } from './dec-mesh-qa.models';
import { DecConfigurationService } from '../../services/configuration/configuration.service';

const meshBase = {
  'ErrorCode': {
    'language': 'en',
    'sub': {
      '0': {
        'name': 'REJECT/MISTAKES',
        'sub': {
          '0': {
            'name': 'REJECT',
            'sub': {
              '0': {
                'name': 'REJECT MODEL',
                'description': 'The model doesn t match the product. Please, remodel it. Always follow the reference when modeling your product.'
              },
              '1': {
                'name': 'NOTHING WAS CHANGED',
                'description': 'The adjustments previously asked were not made. It is necessary to make them so your job can be approved.'
              },
              '2': {
                'name': 'DIDN T FOLLOW BRIEFING',
                'description': 'The briefing was not followed, please read the briefing before you start modeling.',
                'helpLink': 'http://home.decoracontent.com/briefing'
              },
              '3': {
                'name': 'CHANGE NOT REQUESTED',
                'description': 'There are changes which were not requested.'
              }
            }
          },
          '1': {
            'name': 'RENDER ERROR',
            'description': 'The model s image has a rendering failure. It is important to fix it before you submit your work, so you don t lose a round in the homologation.'
          }
        }
      },
      '1': {
        'name': 'MEASURE',
        'sub': {
          '0': {
            'name': 'GROUP MEASURE',
            'sub': {
              '0': {
                'name': 'DEPTH',
                'description': 'The depth of the model is not correct. In the Details tab of our plataform, remember to check if there is a File field with technical specifications of the product.'
              },
              '1': {
                'name': 'WIDTH',
                'description': 'The width of the model is not correct. In the Details tab of our plataform, remember to check if there is a File field with technical specifications of the product.'
              },
              '2': {
                'name': 'HEIGHT',
                'description': 'The height of the model is not correct. In the Details tab of our plataform, remember to check if there is a File field with technical specifications of the product.'
              },
              '3': {
                'name': 'CHECK MEASURE',
                'description': 'The measures of the group are not correct. In the Details tab of our plataform, remember to check if there is a File field with technical specifications of the product.'
              }
            }
          },
          '1': {
            'name': 'ELEMENT MEASURES',
            'sub': {
              '0': {
                'name': 'HEIGHT',
                'sub': {
                  '0': {
                    'name': 'INCREASE',
                    'sub': {
                      '0': {
                        'name': 'INCREASE SLIGHTLY',
                        'description': 'Slightly increase the height of this element, following the reference image.'
                      },
                      '1': {
                        'name': 'INCREASE',
                        'description': 'Increase the height of this element, following the reference image.'
                      },
                      '2': {
                        'name': 'INCREASE HIGHLY',
                        'description': 'Highly increase the height of this element, following the reference image.'
                      }
                    }
                  },
                  '1': {
                    'name': 'DECREASE',
                    'sub': {
                      '0': {
                        'name': 'DECREASE SLIGHTLY',
                        'description': 'Slightly decrease the height of this element, following the reference image.'
                      },
                      '1': {
                        'name': 'DECREASE',
                        'description': 'Decrease the height of this element, following the reference image.'
                      },
                      '2': {
                        'name': 'DECREASE HIGHLY',
                        'description': 'Highly decrease the height of this element, following the reference image.'
                      }
                    }
                  },
                  '2': {
                    'name': 'CHECK HEIGHT',
                    'description': 'Check if element height is right. In the Details tab of our plataform, remember to check if there is a File field with technical specifications of the product.'
                  }
                }
              },
              '1': {
                'name': 'WIDTH',
                'sub': {
                  '0': {
                    'name': 'INCREASE',
                    'sub': {
                      '0': {
                        'name': 'INCREASE SLIGHTLY',
                        'description': 'Slightly increase the width of this element, following the reference image.'
                      },
                      '1': {
                        'name': 'INCREASE',
                        'description': 'Increase the width of this element, following the reference image.'
                      },
                      '2': {
                        'name': 'INCREASE HIGHLY',
                        'description': 'Highly increase the width of this element, following the reference image.'
                      }
                    }
                  },
                  '1': {
                    'name': 'DECREASE',
                    'sub': {
                      '0': {
                        'name': 'DECREASE SLIGHTLY',
                        'description': 'Slightly decrease the width of this element, following the reference image.'
                      },
                      '1': {
                        'name': 'DECREASE',
                        'description': 'Decrease the width of this element, following the reference image.'
                      },
                      '2': {
                        'name': 'DECREASE HIGHLY',
                        'description': 'Highly decrease the width of this element, following the reference image.'
                      }
                    }
                  },
                  '2': {
                    'name': 'CHECK WIDTH',
                    'description': 'Check if element width is right. In the Details tab of our plataform, remember to check if there is a File field with technical specifications of the product.'
                  }
                }
              },
              '2': {
                'name': 'DEPTH',
                'sub': {
                  '0': {
                    'name': 'INCREASE',
                    'sub': {
                      '0': {
                        'name': 'INCREASE SLIGHTLY',
                        'description': 'Slightly increase the depth of this element, following the reference image.'
                      },
                      '1': {
                        'name': 'INCREASE',
                        'description': 'Increase the depth of this element, following the reference image.'
                      },
                      '2': {
                        'name': 'INCREASE HIGHLY',
                        'description': 'Highly increase the depth of this element, following the reference image.'
                      }
                    }
                  },
                  '1': {
                    'name': 'DECREASE',
                    'sub': {
                      '0': {
                        'name': 'DECREASE SLIGHTLY',
                        'description': 'Slightly decrease the depth of this element, following the reference image.'
                      },
                      '1': {
                        'name': 'DECREASE',
                        'description': 'Decrease the depth of this element, following the reference image.'
                      },
                      '2': {
                        'name': 'DECREASE HIGHLY',
                        'description': 'Highly decrease the depth of this element, following the reference image.'
                      }
                    }
                  },
                  '2': {
                    'name': 'CHECK DEPTH',
                    'description': 'Check if element depth is correct. In the Details tab of our plataform, remember to check if there is a File field with technical specifications of the product.'
                  }
                }
              },
              '3': {
                'name': 'RADIUS',
                'sub': {
                  '0': {
                    'name': 'INCREASE',
                    'sub': {
                      '0': {
                        'name': 'INCREASE SLIGHTLY',
                        'description': 'Slightly increase the radius of this element, following the reference image.'
                      },
                      '1': {
                        'name': 'INCREASE',
                        'description': 'Increase the radius of this element, following the reference image.'
                      },
                      '2': {
                        'name': 'INCREASE HIGHLY',
                        'description': 'Highly increase the radius of this element, following the reference image.'
                      }
                    }
                  },
                  '1': {
                    'name': 'DECREASE',
                    'sub': {
                      '0': {
                        'name': 'DECREASE SLIGHTLY',
                        'description': 'Slightly decrease the radius of this element, following the reference image.'
                      },
                      '1': {
                        'name': 'DECREASE',
                        'description': 'Decrease the radius of this element, following the reference image.'
                      },
                      '2': {
                        'name': 'DECREASE HIGHLY',
                        'description': 'Highly decrease the radius of this element, following the reference image.'
                      }
                    }
                  },
                  '2': {
                    'name': 'CHECK RADIUS',
                    'description': 'Check if element radius is correct. In the Details tab of our plataform, remember to check if there is a File field with technical specifications of the product.'
                  }
                }
              },
              '4': {
                'name': 'PROPORTIONS',
                'sub': {
                  '0': {
                    'name': 'INCREASE',
                    'sub': {
                      '0': {
                        'name': 'INCREASE SLIGHTLY',
                        'description': 'Slightly increase the proportions of this element, following the reference image.'
                      },
                      '1': {
                        'name': 'INCREASE',
                        'description': 'Increase the proportions of this element, following the reference image.'
                      },
                      '2': {
                        'name': 'INCREASE HIGHLY',
                        'description': 'Highly increase the proportions of this element, following the reference image.'
                      }
                    }
                  },
                  '1': {
                    'name': 'DECREASE',
                    'sub': {
                      '0': {
                        'name': 'DECREASE SLIGHTLY',
                        'description': 'Slightly decrease the proportions of this element, following the reference image.'
                      },
                      '1': {
                        'name': 'DECREASE',
                        'description': 'Decrease the proportions of this element, following the reference image.'
                      },
                      '2': {
                        'name': 'DECREASE HIGHLY',
                        'description': 'Highly decrease the proportions of this element, following the reference image.'
                      }
                    }
                  },
                  '2': {
                    'name': 'CHECK PROPORTIONS',
                    'description': 'Incorrect proportions. The size and distance relationship between the elements of the model are not following the reference. In the Details tab of our plataform, remember to check if there is a File field with technical specifications of the product.'
                  }
                }
              },
              '5': {
                'name': 'SIZE',
                'sub': {
                  '0': {
                    'name': 'INCREASE',
                    'sub': {
                      '0': {
                        'name': 'INCREASE SLIGHTLY',
                        'description': 'Slightly increase the size of this element, following the reference image.'
                      },
                      '1': {
                        'name': 'INCREASE',
                        'description': 'Increase the size of this element, following the reference image.'
                      },
                      '2': {
                        'name': 'INCREASE HIGHLY',
                        'description': 'Highly increase the size of this element, following the reference image.'
                      }
                    }
                  },
                  '1': {
                    'name': 'DECREASE',
                    'sub': {
                      '0': {
                        'name': 'DECREASE SLIGHTLY',
                        'description': 'Slightly decrease the size of this element, following the reference image.'
                      },
                      '1': {
                        'name': 'DECREASE',
                        'description': 'Decrease the size of this element, following the reference image.'
                      },
                      '2': {
                        'name': 'DECREASE HIGHLY',
                        'description': 'Highly decrease the size of this element, following the reference image.'
                      }
                    }
                  },
                  '2': {
                    'name': 'UNIFORM',
                    'description': 'The size of these elements must be uniform. Check the reference.'
                  },
                  '3': {
                    'name': 'CHECK SIZE',
                    'description': 'Check if element size is correct. In the Details tab of our plataform, remember to check if there is a File field with technical specifications of the product.'
                  }
                }
              }
            }
          }
        }
      },
      '2': {
        'name': 'SHAPE',
        'sub': {
          '0': {
            'name': 'GENERAL SHAPE',
            'sub': {
              '0': {
                'name': 'IMPROVE',
                'description': 'The model if deformed/bumped. The shape must be smoother. Please improve it.'
              },
              '1': {
                'name': 'STRAIGHT',
                'description': 'This element should be straight, check reference image.'
              },
              '2': {
                'name': 'SQUARED',
                'description': 'This part should be squared.'
              },
              '3': {
                'name': 'RECTANGULAR',
                'description': 'This part should be rectangular.'
              },
              '4': {
                'name': 'OVAL',
                'description': 'This part should be oval.'
              },
              '5': {
                'name': 'ROUNDED',
                'description': 'This part should be rounded.'
              },
              '6': {
                'name': 'CURVED',
                'description': 'This part should be curved.'
              },
              '7': {
                'name': 'TRIANGULAR',
                'sub': {
                  '0': {
                    'name': 'RECTANGULAR TRIANGLE',
                    'description': 'This element should have the shape of a RECTANGULAR triangle, which means it should form a right angle in one of the sides.'
                  },
                  '1': {
                    'name': 'EQUILATERAL TRIANGLE',
                    'description': 'This element should have the shape of a EQUILATERAL triangle, which means that all sides should have the same size.'
                  },
                  '2': {
                    'name': 'ISOSCELES TRIANGLE',
                    'description': 'This element should have the shape of a ISOSCELES triangle, which means that two of the sides should have the same size.'
                  }
                }
              },
              '8': {
                'name': 'HEXAGONAL',
                'description': 'This part should be hexagonal.'
              }
            }
          },
          '1': {
            'name': 'EDGES',
            'sub': {
              '0': {
                'name': 'SOFTEN',
                'description': 'Soften these edges following the reference product.'
              },
              '1': {
                'name': 'ROUND',
                'description': 'Round these edges following the reference product.'
              },
              '2': {
                'name': 'INCREASE',
                'description': 'Increase the edges.'
              },
              '3': {
                'name': 'DECREASE',
                'description': 'Decrease the edges in this part of the object.'
              },
              '4': {
                'name': 'DOESN T EXIST',
                'description': 'This border doesn t exist in the reference.'
              },
              '5': {
                'name': 'EXISTS',
                'description': 'There should be a border here, check reference image.'
              },
              '6': {
                'name': 'IMPROVE',
                'description': 'This border is not looking like the reference. Remodel or improve it.'
              },
              '7': {
                'name': 'CHAMFER',
                'description': 'The borders of this element are chamfered. Apply the chamfer amount following the reference.'
              },
              '8': {
                'name': 'UNEVEN',
                'description': 'The edges of this element are too perfect, make them more uneven following the reference.'
              },
              '9': {
                'name': 'EMPHASIZE',
                'description': 'Emphasize this edge following the reference product.'
              },
              'A': {
                'name': 'HARD',
                'description': 'These edges must be hard. Check the reference product.'
              }
            }
          },
          '2': {
            'name': 'CORNERS',
            'sub': {
              '0': {
                'name': 'SOFTEN',
                'description': 'Soften these corners following the reference product.'
              },
              '1': {
                'name': 'ROUND',
                'description': 'Round these corners following the reference product.'
              },
              '2': {
                'name': 'HARD',
                'description': 'These corners must be hard. Check the reference product.'
              },
              '3': {
                'name': 'CHAMFER',
                'description': 'The corners of this element are chamfered. Apply the chamfer amount following the reference.'
              }
            }
          },
          '3': {
            'name': 'SURFACE',
            'sub': {
              '0': {
                'name': 'PLANAR',
                'description': 'The surface of this element must be planar. Check the reference.'
              },
              '1': {
                'name': 'CURVED',
                'description': 'The surface of this element must be curved. Follow the curvature amount according to the reference.'
              },
              '2': {
                'name': 'UNEVEN',
                'description': 'The surface of this element is too perfect, make it more uneven following the reference.'
              }
            }
          },
          '4': {
            'name': 'CURVATURE',
            'sub': {
              '0': {
                'name': 'INCREASE',
                'description': 'Increase this curvature following the reference product.'
              },
              '1': {
                'name': 'DECREASE',
                'description': 'Decrease this curvature following the reference product.'
              },
              '2': {
                'name': 'EXISTS',
                'description': 'There should be a curve here.'
              },
              '3': {
                'name': 'DOESN T EXIST',
                'description': 'This curve doesn t exist in reference product.'
              },
              '4': {
                'name': 'EMPHASIZE',
                'description': 'Emphasize this curve following the reference product.'
              },
              '5': {
                'name': 'SOFTEN',
                'description': 'Soften this curve following the reference product.'
              }
            }
          },
          '5': {
            'name': 'THICKNESS',
            'sub': {
              '0': {
                'name': 'SLIGHTLY INCREASE',
                'description': 'Slightly increase thickness following the reference product.'
              },
              '1': {
                'name': 'INCREASE',
                'description': 'Increase thickness following the reference product.'
              },
              '2': {
                'name': 'HIGHLY INCREASE',
                'description': 'Highly increase thickness following the reference product.'
              },
              '3': {
                'name': 'SLIGHTLY DECREASE',
                'description': 'Slightly decrease thickness following the reference product.'
              },
              '4': {
                'name': 'DECREASE',
                'description': 'Decrease thickness following the reference product.'
              },
              '5': {
                'name': 'HIGHLY DECREASE',
                'description': 'Highly increase thickness following the reference product.'
              }
            }
          },
          '6': {
            'name': 'DIVISION',
            'sub': {
              '0': {
                'name': 'SLIGHTLY INCREASE',
                'description': 'Slightly increase this division following the reference product.'
              },
              '1': {
                'name': 'INCREASE',
                'description': 'Increase this division following the reference product.'
              },
              '2': {
                'name': 'HIGHLY INCREASE',
                'description': 'Highly increase this division following the reference product.'
              },
              '3': {
                'name': 'SLIGHTLY DECREASE',
                'description': 'Slightly decrease this division following the reference product.'
              },
              '4': {
                'name': 'DECREASE',
                'description': 'Decrease this division following the reference product.'
              },
              '5': {
                'name': 'HIGHLY DECREASE',
                'description': 'Highly decrease this division following the reference product'
              },
              '6': {
                'name': 'ADD',
                'description': 'There should be a division in between these elements as shown in reference image. Add it.'
              },
              '7': {
                'name': 'REMOVE',
                'description': 'This division doesn t exist in the product. Remove it.'
              }
            }
          },
          '7': {
            'name': 'ELEMENT MISSING/EXCESS',
            'sub': {
              '0': {
                'name': 'MISSING',
                'description': 'There s more elements like these in the reference. Count them and compare it with the product.'
              },
              '1': {
                'name': 'EXCESS',
                'description': 'There should be less of these elements on your model. Count them and compare it to reference product.'
              },
              '2': {
                'name': 'EXISTS',
                'description': 'There is one or more elements missing here. Check reference product.'
              },
              '3': {
                'name': 'DOESN T EXIST',
                'description': 'This element doesn t exist in the reference product.'
              },
              '4': {
                'name': 'ADD',
                'description': 'There s one or more elements that needs to be modeled. Check the amount on the reference.'
              },
              '5': {
                'name': 'REMOVE',
                'description': 'This element is not part of the product and must be removed.'
              }
            }
          },
          '8': {
            'name': 'ANGLE',
            'sub': {
              '0': {
                'name': 'TOO CLOSED',
                'description': 'The angle of this element in the object is too closed. Check reference.'
              },
              '1': {
                'name': 'TOO OPEN',
                'description': 'The angle of this element in the object is too open. Check reference.'
              },
              '2': {
                'name': 'INCORRECT',
                'description': 'The angle of this element in the object is incorrect. Check reference.'
              }
            }
          },
          '9': {
            'name': 'INCLINATION',
            'sub': {
              '0': {
                'name': 'INCREASE INCLINATION',
                'description': 'Increase this inclination following the reference product.'
              },
              '1': {
                'name': 'DECREASE INCLINATION',
                'description': 'Decrease this inclination following the reference product.'
              },
              '2': {
                'name': 'REMOVE INCLINATION',
                'description': 'Remove this inclination.'
              },
              '3': {
                'name': 'ADD INCLINATION',
                'description': 'There should be an inclination in this part of the model.'
              }
            }
          },
          'A': {
            'name': 'CREASE',
            'sub': {
              '0': {
                'name': 'ACCENTUATE',
                'description': 'Accentuate this crease on the model.'
              },
              '1': {
                'name': 'CREASE',
                'description': 'Soften this crease following the reference product.'
              },
              '2': {
                'name': 'MISSING',
                'description': 'There should be creases in this part of the model. Check reference image.'
              },
              '3': {
                'name': 'EXCESS',
                'description': 'There are more creases then the reference product. Check reference image for the right quantity.'
              },
              '4': {
                'name': 'INCREASE',
                'description': 'Increase this crease. Check reference image for the right size.'
              },
              '5': {
                'name': 'DECREASE',
                'description': 'Decrease this crease. Check reference image for the right size.'
              },
              '6': {
                'name': 'REMOVE',
                'description': 'Remove this crease.'
              }
            }
          },
          'B': {
            'name': 'DEPRESSION',
            'sub': {
              '0': {
                'name': 'ACCENTUATE',
                'description': 'Accentuate this depression. Check reference product to see how accentuated it should be.'
              },
              '1': {
                'name': 'SOFTEN',
                'description': 'Soften this depression. Check reference product to see how soft it should be.'
              },
              '2': {
                'name': 'MISSING',
                'description': 'There should be a depression in this element. Check reference product to see the right position.'
              },
              '3': {
                'name': 'REMOVE',
                'description': 'This depression doesn t exist in the reference product. Remove it.'
              },
              '4': {
                'name': 'INCREASE',
                'description': 'Increase this depression. Check reference product to see the right size.'
              },
              '5': {
                'name': 'DECREASE',
                'description': 'Decrease this depression. Check reference product to see the right size.'
              }
            }
          },
          'C': {
            'name': 'HOLE/OPENING',
            'sub': {
              '0': {
                'name': 'INCREASE',
                'description': 'Increase this hole/opening following the reference product.'
              },
              '1': {
                'name': 'DECREASE',
                'description': 'Decrease this hole/opening following the reference product.'
              },
              '2': {
                'name': 'MISSING',
                'description': 'There are some holes/openings missing here. Check reference product.'
              },
              '3': {
                'name': 'REMOVE',
                'description': 'These holes/openings don t exist in the reference product.'
              }
            }
          },
          'D': {
            'name': 'GROOVES',
            'sub': {
              '0': {
                'name': 'ACCENTUATE',
                'description': 'Accentuate this groove. Check reference product to see how accentuated it should be.'
              },
              '1': {
                'name': 'SOFTEN',
                'description': 'Soften this groove. Check reference product to see how soft it should be.'
              },
              '2': {
                'name': 'MISSING',
                'description': 'There are grooves missing. Check reference product to see the right quantity.'
              },
              '3': {
                'name': 'EXCESS',
                'description': 'There are too many grooves. Check reference product to see the right quantity.'
              },
              '4': {
                'name': 'DOESN T EXIST',
                'description': 'These grooves don t exist in the reference product. Remove it.'
              },
              '5': {
                'name': 'INCREASE',
                'description': 'Increase this groove. Check reference product to see the right size.'
              },
              '6': {
                'name': 'DECREASE',
                'description': 'Decrease this groove. Check reference product to see the right size.'
              },
              '7': {
                'name': 'IMPROVE',
                'description': 'The shape of the grooves is different from the reference. Please improve it.'
              }
            }
          },
          'E': {
            'name': 'MARKS/IMPERFECTIONS',
            'sub': {
              '0': {
                'name': 'INCREASE',
                'description': 'Increase this mark. Check the reference to see the right size.'
              },
              '1': {
                'name': 'DECREASE',
                'description': 'Decrease this mark. Check the reference to see the right size.'
              },
              '2': {
                'name': 'MISSING',
                'description': 'There is a mark missing here. Check the reference product.'
              },
              '3': {
                'name': 'EXCESS',
                'description': 'There should be less marks here. Check the reference product to see the right quantity.'
              },
              '4': {
                'name': 'DOESN T EXIST',
                'description': 'This/these mark/marks doesn t/don t exist in the reference product. Remove it.'
              },
              '5': {
                'name': 'ACCENTUATE',
                'description': 'Accentuate this mark. Check the reference product to see how accentuated it should be.'
              },
              '6': {
                'name': 'SOFTEN',
                'description': 'Soften this mark. Check reference product to see how soft it should be.'
              }
            }
          },
          'F': {
            'name': 'SALIENCE',
            'sub': {
              '0': {
                'name': 'INCREASE',
                'description': 'Increase this salience. Check reference product to see the right size.'
              },
              '1': {
                'name': 'DECREASE',
                'description': 'Decrease this salience. Check reference product to see the right size.'
              },
              '2': {
                'name': 'MISSING',
                'description': 'There is/are a/some salience(s) missing here. Check reference product for the right quantity and position.'
              },
              '3': {
                'name': 'DOESN T EXIST',
                'description': 'This salience doesn t exist in the reference product.'
              },
              '4': {
                'name': 'ACCENTUATE',
                'description': 'Accentuate this salience. Check reference product to see how accentuated it should be.'
              },
              '5': {
                'name': 'SOFTEN',
                'description': 'Soften this salience. Check reference product to see how soft it should be.'
              }
            }
          },
          'G': {
            'name': 'SEAM',
            'sub': {
              '0': {
                'name': 'ADD',
                'description': 'There s a seam here, check the reference.'
              },
              '1': {
                'name': 'REMOVE',
                'description': 'This seam doesn t exist. Remove it.'
              },
              '2': {
                'name': 'ACCENTUATE',
                'description': 'Accentuate this seam. Check reference product to see how accentuated it should be.'
              },
              '3': {
                'name': 'SOFTEN',
                'description': 'Soften this seam. Check reference product to see how soft it should be.'
              },
              '4': {
                'name': 'BIAS SEAM MISSING',
                'description': 'There should be a bias seam here. Check the reference product.'
              },
              '5': {
                'name': 'BIAS SEAM DOESN T EXIST',
                'description': 'This bias seam doesn t exist in the reference product.'
              },
              '6': {
                'name': 'VERTICAL SEAM',
                'description': 'This seam should be vertical. Check reference product.'
              },
              '7': {
                'name': 'HORIZONTAL SEAM',
                'description': 'This seam should be horizontal. Check reference product.'
              },
              '8': {
                'name': 'PARALLEL SEAM',
                'description': 'This seam should be parallel with the model. Check reference product.'
              },
              '9': {
                'name': 'INCORRECTLY MADE',
                'description': 'This seam is incorrect. Check the reference product.'
              }
            }
          },
          'H': {
            'name': 'DISTANCE BETWEEN PARTS',
            'sub': {
              '0': {
                'name': 'REMOVE',
                'description': 'The distance between these elements doesn t exist in the referece product. Remove it.'
              },
              '1': {
                'name': 'SLIGHTLY INCREASE',
                'description': 'Softly increase the distance between these elements as reference product.'
              },
              '2': {
                'name': 'INCREASE',
                'description': 'Increase the distance between these elements as reference product.'
              },
              '3': {
                'name': 'HIGHLY INCREASE',
                'description': 'Highly increase the distance between these elements as reference product.'
              },
              '4': {
                'name': 'SLIGHTLY DECREASE',
                'description': 'Slightly decrease the distance between these elements as reference product.'
              },
              '5': {
                'name': 'DECREASE',
                'description': 'Decrease the distance between these elements as reference product.'
              },
              '6': {
                'name': 'HIGHLY DECREASE',
                'description': 'Highly decrease the distance between these elements as reference product.'
              },
              '7': {
                'name': 'ADD',
                'description': 'There should be a certain distance between these elements as the reference product. Add it.'
              },
              '8': {
                'name': 'EQUAL',
                'description': 'The model have distance variation in gaps/spacings between parts. They must be equal on the whole product.'
              }
            }
          },
          'I': {
            'name': 'SYMMETRY',
            'sub': {
              '0': {
                'name': 'TOP/BOTTOM',
                'description': 'The top and bottom parts of this element are symmetrical. Check the reference image.'
              },
              '1': {
                'name': 'LEFT/RIGHT',
                'description': 'The left and right sides of this element are symmetrical. Check the reference image.'
              },
              '2': {
                'name': 'ASYMMETRICAL',
                'description': 'This element is not symmetrical. Check the reference image.'
              }
            }
          },
          'J': {
            'name': 'FUR/FIBERS',
            'sub': {
              '0': {
                'name': 'ADD',
                'description': 'This element has fur/fibers. Check the reference.'
              },
              '1': {
                'name': 'REMOVE',
                'description': 'This element doesn t have fur/fibers. Check the reference.'
              },
              '2': {
                'name': 'DENSITY',
                'sub': {
                  '0': {
                    'name': 'INCREASE',
                    'description': 'Increase the density of the fur/fibers following the reference.'
                  },
                  '1': {
                    'name': 'DECREASE',
                    'description': 'Decrease the density of the fur/fibers following the reference.'
                  }
                }
              },
              '3': {
                'name': 'LENGTH',
                'sub': {
                  '0': {
                    'name': 'INCREASE',
                    'sub': {
                      '0': {
                        'name': 'INCREASE SLIGHTLY',
                        'description': 'Slightly increase the length of the fur/fibers following the reference.'
                      },
                      '1': {
                        'name': 'INCREASE',
                        'description': 'Increase the length of the fur/fibers following the reference.'
                      },
                      '2': {
                        'name': 'INCREASE HIGHLY',
                        'description': 'Highly increase the length of the fur/fibers following the reference.'
                      }
                    }
                  },
                  '1': {
                    'name': 'DECREASE',
                    'sub': {
                      '0': {
                        'name': 'DECREASE SLIGHTLY',
                        'description': 'Slightly decrease the length of the fur/fibers following the reference.'
                      },
                      '1': {
                        'name': 'DECREASE',
                        'description': 'Decrease the length of the fur/fibers following the reference.'
                      },
                      '2': {
                        'name': 'DECREASE HIGHLY',
                        'description': 'Highly decrease the length of the fur/fibers following the reference.'
                      }
                    }
                  }
                }
              },
              '4': {
                'name': 'THICKNESS',
                'sub': {
                  '0': {
                    'name': 'INCREASE',
                    'sub': {
                      '0': {
                        'name': 'INCREASE SLIGHTLY',
                        'description': 'Slightly increase the thickness of the fur/fibers following the reference.'
                      },
                      '1': {
                        'name': 'INCREASE',
                        'description': 'Increase the thickness of the fur/fibers following the reference.'
                      },
                      '2': {
                        'name': 'INCREASE HIGHLY',
                        'description': 'Highly increase the thickness of the fur/fibers following the reference.'
                      }
                    }
                  },
                  '1': {
                    'name': 'DECREASE',
                    'sub': {
                      '0': {
                        'name': 'DECREASE SLIGHTLY',
                        'description': 'Slightly decrease the thickness of the fur/fibers following the reference.'
                      },
                      '1': {
                        'name': 'DECREASE',
                        'description': 'Decrease the thickness of the fur/fibers following the reference.'
                      },
                      '2': {
                        'name': 'DECREASE HIGHLY',
                        'description': 'Highly decrease the thickness of the fur/fibers following the reference.'
                      }
                    }
                  }
                }
              },
              '5': {
                'name': 'TIP',
                'sub': {
                  '0': {
                    'name': 'INCREASE',
                    'sub': {
                      '0': {
                        'name': 'INCREASE SLIGHTLY',
                        'description': 'Slightly increase the tip thickness of the fur/fibers following the reference.'
                      },
                      '1': {
                        'name': 'INCREASE',
                        'description': 'Increase the tip thickness of the fur/fibers following the reference.'
                      },
                      '2': {
                        'name': 'INCREASE HIGHLY',
                        'description': 'Highly increase the tip thickness of the fur/fibers following the reference.'
                      }
                    }
                  },
                  '1': {
                    'name': 'DECREASE',
                    'sub': {
                      '0': {
                        'name': 'DECREASE SLIGHTLY',
                        'description': 'Slightly decrease the tip thickness of the fur/fibers following the reference.'
                      },
                      '1': {
                        'name': 'DECREASE',
                        'description': 'Decrease the tip thickness of the fur/fibers following the reference.'
                      },
                      '2': {
                        'name': 'DECREASE HIGHLY',
                        'description': 'Highly decrease the tip thickness of the fur/fibers following the reference.'
                      }
                    }
                  }
                }
              }
            }
          },
          'K': {
            'name': 'CUSHIONED',
            'sub': {
              '0': {
                'name': 'INCREASE SLIGHTLY',
                'description': 'Slightly increase the cushioned apperance of this element following the reference.'
              },
              '1': {
                'name': 'INCREASE',
                'description': 'Increase the cushioned apperance of this element following the reference.'
              },
              '2': {
                'name': 'INCREASE HIGHLY',
                'description': 'Highly increase the cushioned apperance of this element following the reference.'
              },
              '3': {
                'name': 'DECREASE SLIGHTLY',
                'description': 'Slightly decrease the cushioned apperance of this element following the reference.'
              },
              '4': {
                'name': 'DECREASE',
                'description': 'Decrease the cushioned apperance of this element following the reference.'
              },
              '5': {
                'name': 'DECREASE HIGHLY',
                'description': 'Highly decrease the cushioned apperance of this element following the reference.'
              }
            }
          },
          'L': {
            'name': 'FOLDS/CREASES',
            'sub': {
              '0': {
                'name': 'ADD',
                'description': 'Add folds/creases to the model following the reference.'
              },
              '1': {
                'name': 'REMOVE',
                'description': 'Remove the folds/creases of the model. Check the reference.'
              },
              '2': {
                'name': 'EMPHASIZE',
                'description': 'Emphasize the folds/creases of the model. Check the amount on the reference.'
              },
              '3': {
                'name': 'SOFTEN',
                'description': 'Soften the folds/creases of the model. Check the amount on the reference.'
              },
              '4': {
                'name': 'SIZE',
                'sub': {
                  '0': {
                    'name': 'INCREASE SLIGHTLY',
                    'description': 'Slightly increase the size of the folds/creases following the reference.'
                  },
                  '1': {
                    'name': 'INCREASE',
                    'description': 'Increase the size of the folds/creases following the reference.'
                  },
                  '2': {
                    'name': 'INCREASE HIGHLY',
                    'description': 'Highly increase the size of the folds/creases following the reference.'
                  },
                  '3': {
                    'name': 'DECREASE SLIGHTLY',
                    'description': 'Slightly decrease the size of the folds/creases following the reference.'
                  },
                  '4': {
                    'name': 'DECREASE',
                    'description': 'Decrease the size of the folds/creases following the reference.'
                  },
                  '5': {
                    'name': 'DECREASE HIGHLY',
                    'description': 'Highly decrease the size of the folds/creases following the reference.'
                  }
                }
              }
            }
          }
        }
      },
      '3': {
        'name': 'MATERIALS',
        'sub': {
          '0': {
            'name': 'COLOR',
            'sub': {
              '0': {
                'name': 'TEMPERATURE',
                'sub': {
                  '0': {
                    'name': 'WARMER SLIGHTLY',
                    'description': 'The color tone in this material should be slightly warmer as the reference image. Use DecoraTools studio to render or your results will turn out to be different!'
                  },
                  '1': {
                    'name': 'WARMER',
                    'description': 'The color tone in this material should be warmer as the reference image. Use DecoraTools studio to render or your results will turn out to be different!'
                  },
                  '2': {
                    'name': 'WARMER HIGHLY',
                    'description': 'The color tone in this material should be highly warmer as the reference image. Use DecoraTools studio to render or your results will turn out to be different!'
                  },
                  '3': {
                    'name': 'COOLER SLIGHTLY',
                    'description': 'The color tone in this material should be slightly cooler as the reference image. Use DecoraTools studio to render or your results will turn out to be different!'
                  },
                  '4': {
                    'name': 'COOLER',
                    'description': 'The color tone in this material should be cooler as the reference image. Use DecoraTools studio to render or your results will turn out to be different!'
                  },
                  '5': {
                    'name': 'COOLER HIGHLY',
                    'description': 'The color tone in this material should be highly cooler as the reference image. Use DecoraTools studio to render or your results will turn out to be different!'
                  }
                }
              },
              '1': {
                'name': 'SATURATION',
                'sub': {
                  '0': {
                    'name': 'INCREASE SLIGHTLY',
                    'description': 'Slightly increase the saturation of this color following the reference. Use DecoraTools studio to render or your results will be different!'
                  },
                  '1': {
                    'name': 'INCREASE',
                    'description': 'Increase the saturation of this color following the reference. Use DecoraTools studio to render or your results will be different!'
                  },
                  '2': {
                    'name': 'INCREASE HIGHLY',
                    'description': 'Highly increase the saturation of this color following the reference. Use DecoraTools studio to render or your results will be different!'
                  },
                  '3': {
                    'name': 'DECREASE SLIGHTLY',
                    'description': 'Slightly decrease the saturation of this color following the reference. Use DecoraTools studio to render or your results will be different!'
                  },
                  '4': {
                    'name': 'DECREASE',
                    'description': 'Decrease the saturation of this color following the reference. Use DecoraTools studio to render or your results will be different!'
                  },
                  '5': {
                    'name': 'DECREASE HIGHLY',
                    'description': 'Highly decrease the saturation of this color following the reference. Use DecoraTools studio to render or your results will be different!'
                  }
                }
              },
              '2': {
                'name': 'TONE',
                'sub': {
                  '0': {
                    'name': 'LIGHTEN SLIGHTLY',
                    'description': 'Slightly lighten the tone of the material, check the reference image for the correct tone. Use DecoraTools studio to render or your results will be different!'
                  },
                  '1': {
                    'name': 'LIGHTEN',
                    'description': 'Lighten the tone of the material, check the reference image for the correct tone. Use DecoraTools studio to render or your results will be different!'
                  },
                  '2': {
                    'name': 'LIGHTEN HIGHLY',
                    'description': 'Highly lighten the tone of the material, check the reference image for the correct tone. Use DecoraTools studio to render or your results will be different!'
                  },
                  '3': {
                    'name': 'DARKEN SLIGHTLY',
                    'description': 'Slightly darken the tone of the material, check the reference image for the correct tone. Use DecoraTools studio to render or your results will be different!'
                  },
                  '4': {
                    'name': 'DARKEN',
                    'description': 'Darken the tone of the material, check the reference image for the correct tone. Use DecoraTools studio to render or your results will be different!'
                  },
                  '5': {
                    'name': 'DARKEN HIGHLY',
                    'description': 'Highly darken the tone of the material, check the reference image for the correct tone. Use DecoraTools studio to render or your results will be different!'
                  }
                }
              },
              '3': {
                'name': 'CONTRAST',
                'sub': {
                  '0': {
                    'name': 'INCREASE SLIGHTLY',
                    'description': 'Slightly increase the contrast of this texture following the reference. Use DecoraTools studio to render or your results will be different!'
                  },
                  '1': {
                    'name': 'INCREASE',
                    'description': 'Increase the contrast of this texture following the reference. Use DecoraTools studio to render or your results will be different!'
                  },
                  '2': {
                    'name': 'INCREASE HIGHLY',
                    'description': 'Highly increase the contrast of this texture following the reference. Use DecoraTools studio to render or your results will be different!'
                  },
                  '3': {
                    'name': 'DECREASE SLIGHTLY',
                    'description': 'Slightly decrease the contrast of this texture following the reference. Use DecoraTools studio to render or your results will be different!'
                  },
                  '4': {
                    'name': 'DECREASE',
                    'description': 'Decrease the contrast of this texture following the reference. Use DecoraTools studio to render or your results will be different!'
                  },
                  '5': {
                    'name': 'DECREASE HIGHLY',
                    'description': 'Highly decrease the contrast of this texture following the reference. Use DecoraTools studio to render or your results will be different!'
                  }
                }
              },
              '4': {
                'name': 'WRONG COLOR',
                'description': 'Color is wrong, please check the reference image.'
              },
              '5': {
                'name': 'VARIATION',
                'sub': {
                  '0': {
                    'name': 'INCREASE SLIGHTLY',
                    'description': 'The color/texture of this material must have slightly more variation. Observe the reference. Use DecoraTools studio to render or your results will be different!'
                  },
                  '1': {
                    'name': 'INCREASE',
                    'description': 'The color/texture of this material must have more variation. Observe the reference. Use DecoraTools studio to render or your results will be different!'
                  },
                  '2': {
                    'name': 'INCREASE HIGHLY',
                    'description': 'The color/texture of this material must have a lot more variation. Observe the reference. Use DecoraTools studio to render or your results will be different!'
                  },
                  '3': {
                    'name': 'DECREASE SLIGHTLY',
                    'description': 'The color/texture of this material must have slightly less variation. Observe the reference. Use DecoraTools studio to render or your results will be different!'
                  },
                  '4': {
                    'name': 'DECREASE',
                    'description': 'The color/texture of this material must have less variation. Observe the reference. Use DecoraTools studio to render or your results will be different!'
                  },
                  '5': {
                    'name': 'DECREASE HIGHLY',
                    'description': 'The color/texture of this material must have alot  more variation. Observe the reference. Use DecoraTools studio to render or your results will be different!'
                  }
                }
              },
              '6': {
                'name': 'UNIFORM',
                'description': 'The color of this material must be uniform. Observe the reference. Use DecoraTools studio to render or your results will be different!'
              },
              '7': {
                'name': 'HUE',
                'sub': {
                  '0': {
                    'name': 'RED',
                    'sub': {
                      '0': {
                        'name': 'INCREASE SLIGHTLY',
                        'description': 'The tone of this color must be slightly more reddish. Check the reference.'
                      },
                      '1': {
                        'name': 'INCREASE',
                        'description': 'The tone of this color must be more reddish. Check the reference.'
                      },
                      '2': {
                        'name': 'INCREASE HIGHLY',
                        'description': 'The tone of this color must be considerably more reddish. Check the reference.'
                      },
                      '3': {
                        'name': 'DECREASE SLIGHTLY',
                        'description': 'The tone of this color must be slightly less reddish. Check the reference.'
                      },
                      '4': {
                        'name': 'DECREASE',
                        'description': 'The tone of this color must be less reddish. Check the reference.'
                      },
                      '5': {
                        'name': 'DECREASE HIGHLY',
                        'description': 'The tone of this color must be considerably less reddish. Check the reference.'
                      }
                    }
                  },
                  '1': {
                    'name': 'YELLOW',
                    'sub': {
                      '0': {
                        'name': 'INCREASE SLIGHTLY',
                        'description': 'The tone of this color must be slightly more yellowish. Check the reference.'
                      },
                      '1': {
                        'name': 'INCREASE',
                        'description': 'The tone of this color must be more yellowish. Check the reference.'
                      },
                      '2': {
                        'name': 'INCREASE HIGHLY',
                        'description': 'The tone of this color must be considerably more yellowish. Check the reference.'
                      },
                      '3': {
                        'name': 'DECREASE SLIGHTLY',
                        'description': 'The tone of this color must be slightly less yellowish. Check the reference.'
                      },
                      '4': {
                        'name': 'DECREASE',
                        'description': 'The tone of this color must be less yellowish. Check the reference.'
                      },
                      '5': {
                        'name': 'DECREASE HIGHLY',
                        'description': 'The tone of this color must be considerably less yellowish. Check the reference.'
                      }
                    }
                  },
                  '2': {
                    'name': 'GREEN',
                    'sub': {
                      '0': {
                        'name': 'INCREASE SLIGHTLY',
                        'description': 'The tone of this color must be slightly more greenish. Check the reference.'
                      },
                      '1': {
                        'name': 'INCREASE',
                        'description': 'The tone of this color must be more greenish. Check the reference.'
                      },
                      '2': {
                        'name': 'INCREASE HIGHLY',
                        'description': 'The tone of this color must be considerably more greenish. Check the reference.'
                      },
                      '3': {
                        'name': 'DECREASE SLIGHTLY',
                        'description': 'The tone of this color must be slightly less greenish. Check the reference.'
                      },
                      '4': {
                        'name': 'DECREASE',
                        'description': 'The tone of this color must be less greenish. Check the reference.'
                      },
                      '5': {
                        'name': 'DECREASE HIGHLY',
                        'description': 'The tone of this color must be considerably less greenish. Check the reference.'
                      }
                    }
                  },
                  '3': {
                    'name': 'BLUE',
                    'sub': {
                      '0': {
                        'name': 'INCREASE SLIGHTLY',
                        'description': 'The tone of this color must be slightly more blueish. Check the reference.'
                      },
                      '1': {
                        'name': 'INCREASE',
                        'description': 'The tone of this color must be more blueish. Check the reference.'
                      },
                      '2': {
                        'name': 'INCREASE HIGHLY',
                        'description': 'The tone of this color must be considerably more blueish. Check the reference.'
                      },
                      '3': {
                        'name': 'DECREASE SLIGHTLY',
                        'description': 'The tone of this color must be slightly less blueish. Check the reference.'
                      },
                      '4': {
                        'name': 'DECREASE',
                        'description': 'The tone of this color must be less blueish. Check the reference.'
                      },
                      '5': {
                        'name': 'DECREASE HIGHLY',
                        'description': 'The tone of this color must be considerably less blueish. Check the reference.'
                      }
                    }
                  },
                  '4': {
                    'name': 'MAGENTA',
                    'sub': {
                      '0': {
                        'name': 'INCREASE SLIGHTLY',
                        'description': 'The tone of this color must be slightly more magenta. Check the reference.'
                      },
                      '1': {
                        'name': 'INCREASE',
                        'description': 'The tone of this color must be more magenta. Check the reference.'
                      },
                      '2': {
                        'name': 'INCREASE HIGHLY',
                        'description': 'The tone of this color must be considerably more magenta. Check the reference.'
                      },
                      '3': {
                        'name': 'DECREASE SLIGHTLY',
                        'description': 'The tone of this color must be slightly less magenta. Check the reference.'
                      },
                      '4': {
                        'name': 'DECREASE',
                        'description': 'The tone of this color must be less magenta. Check the reference.'
                      },
                      '5': {
                        'name': 'DECREASE HIGHLY',
                        'description': 'The tone of this color must be considerably less magenta. Check the reference.'
                      }
                    }
                  },
                  '5': {
                    'name': 'WHITE',
                    'description': 'The tone of this color must be more white. Check the reference.'
                  },
                  '6': {
                    'name': 'GRAY',
                    'description': 'The tone of this color must be more gray. Check the reference.'
                  },
                  '7': {
                    'name': 'BLACK',
                    'description': 'The tone of this color must be more black. Check the reference.'
                  },
                  '8': {
                    'name': 'BEIGE',
                    'description': 'The tone of this color must be beige. Check the reference.'
                  },
                  '9': {
                    'name': 'BROWN',
                    'description': 'The tone of this color must be brown. Check the reference.'
                  },
                  'A': {
                    'name': 'COFFEE',
                    'description': 'The tone of this color must be coffee. Check the reference.'
                  }
                }
              }
            }
          },
          '1': {
            'name': 'TEXTURE MAPS',
            'sub': {
              '0': {
                'name': 'PATTERNS',
                'sub': {
                  '0': {
                    'name': 'HORIZONTAL',
                    'description': 'This pattern should be horizontal.'
                  },
                  '1': {
                    'name': 'VERTICAL',
                    'description': 'This pattern should be vertical.'
                  },
                  '2': {
                    'name': 'DIAGONAL',
                    'description': 'This pattern should be diagonal.'
                  },
                  '3': {
                    'name': 'WAVY',
                    'description': 'This pattern should be wavy.'
                  },
                  '4': {
                    'name': 'DOTTED',
                    'description': 'This pattern should be dotted.'
                  },
                  '5': {
                    'name': 'MORE DIVERSE',
                    'description': 'This pattern should be more diverse.'
                  },
                  '6': {
                    'name': 'LESS DIVERSE',
                    'description': 'This pattern should be less diverse.'
                  },
                  '7': {
                    'name': 'MUST BE REPEATED',
                    'description': 'This pattern should be repeated on the element.'
                  },
                  '8': {
                    'name': 'VEINS/STAINS',
                    'sub': {
                      '0': {
                        'name': 'ADD',
                        'description': 'There are veins/stains in this texture. Please add it.'
                      },
                      '1': {
                        'name': 'REMOVE',
                        'description': 'There s no veins/stains in this texture. Please remove it.'
                      },
                      '2': {
                        'name': 'INCORRECT',
                        'description': 'The texture veins/stains are different from the reference.'
                      },
                      '3': {
                        'name': 'INCREASE',
                        'sub': {
                          '0': {
                            'name': 'INCREASE SLIGHTLY',
                            'description': 'Slightly increase the veins/stains of this texture following the reference.'
                          },
                          '1': {
                            'name': 'INCREASE',
                            'description': 'Increase the veins/stains of this texture following the reference.'
                          },
                          '2': {
                            'name': 'INCREASE HIGHLY',
                            'description': 'Highly increase the veins/stains of this texture following the reference.'
                          }
                        }
                      },
                      '4': {
                        'name': 'DECREASE',
                        'sub': {
                          '0': {
                            'name': 'DECREASE SLIGHTLY',
                            'description': 'Slightly decrease the veins/stains of this texture following the reference.'
                          },
                          '1': {
                            'name': 'DECREASE',
                            'description': 'Decrease the veins/stains of this texture following the reference.'
                          },
                          '2': {
                            'name': 'DECREASE HIGHLY',
                            'description': 'Highly decrease the veins/stains of this texture following the reference.'
                          }
                        }
                      }
                    }
                  },
                  '9': {
                    'name': 'WRONG',
                    'description': 'This is not the correct pattern for the material, check on the reference how it should be done.'
                  }
                }
              },
              '1': {
                'name': 'SIZE',
                'sub': {
                  '0': {
                    'name': 'INCREASE SLIGHTLY',
                    'description': 'Slightly increase the size of this texture following the reference.'
                  },
                  '1': {
                    'name': 'INCREASE',
                    'description': 'Increase the size of this texture following the reference.'
                  },
                  '2': {
                    'name': 'INCREASE HIGHLY',
                    'description': 'Highly increase the size of this texture following the reference.'
                  },
                  '3': {
                    'name': 'DECREASE SLIGHTLY',
                    'description': 'Slightly decrease the size of this texture following the reference.'
                  },
                  '4': {
                    'name': 'DECREASE',
                    'description': 'Decrease the size of this texture following the reference.'
                  },
                  '5': {
                    'name': 'DECREASE HIGHLY',
                    'description': 'Highly decrease the size of this texture following the reference.'
                  }
                }
              },
              '2': {
                'name': 'SEAMS',
                'description': 'There are visible seams. It must look continuous.'
              },
              '3': {
                'name': 'STRETCHED',
                'description': 'The texture is stretched. It s distribution must look more uniform.'
              },
              '4': {
                'name': 'LOW RESOLUTION',
                'description': 'The texture has low resolution.'
              },
              '5': {
                'name': 'NONEXISTENT LIGHT',
                'description': 'There s light information baked on the texture. Remember to remove highlights/reflections, shadows and gradients when extracting textures from the reference.'
              },
              '6': {
                'name': 'REPETITION',
                'description': 'This texture is looking repetitive, as if it was stamped. Maybe it s needed to create more variations in an image editing software.'
              }
            }
          },
          '2': {
            'name': 'BRIGHTNESS/REFLECTION',
            'sub': {
              '0': {
                'name': 'EXIST',
                'description': 'There is reflection on this material. Check the reference product.'
              },
              '1': {
                'name': 'DOES NOT EXIST',
                'description': 'There is no reflection on this material. Check the reference images.'
              },
              '2': {
                'name': 'INTENSITY',
                'sub': {
                  '0': {
                    'name': 'INCREASE SLIGHTLY',
                    'description': 'Slightly increase the reflection of this material following the reference.'
                  },
                  '1': {
                    'name': 'INCREASE',
                    'description': 'Increase the reflection of this material following the reference.'
                  },
                  '2': {
                    'name': 'INCREASE HIGHLY',
                    'description': 'Highly increase the reflection of this material following the reference.'
                  },
                  '3': {
                    'name': 'DECREASE SLIGHTLY',
                    'description': 'Slightly decrease the reflection of this material following the reference.'
                  },
                  '4': {
                    'name': 'DECREASE',
                    'description': 'Decrease the reflection of this material following the reference.'
                  },
                  '5': {
                    'name': 'DECREASE HIGHLY',
                    'description': 'Highly decrease the reflection of this material following the reference.'
                  }
                }
              },
              '3': {
                'name': 'BLUR',
                'sub': {
                  '0': {
                    'name': 'INCREASE SLIGHTLY',
                    'description': 'Slightly increase the blur of the reflection of this material following the reference.'
                  },
                  '1': {
                    'name': 'INCREASE',
                    'description': 'Increase the blur of the reflection of this material following the reference.'
                  },
                  '2': {
                    'name': 'INCREASE HIGHLY',
                    'description': 'Highly increase the blur of the reflection of this material following the reference.'
                  },
                  '3': {
                    'name': 'DECREASE SLIGHTLY',
                    'description': 'Slightly decrease the blur of the reflection of this material following the reference.'
                  },
                  '4': {
                    'name': 'DECREASE',
                    'description': 'Decrease the blur of the reflection of this material following the reference.'
                  },
                  '5': {
                    'name': 'DECREASE HIGHLY',
                    'description': 'Highly decrease the blur of the reflection of this material following the reference.'
                  }
                }
              },
              '4': {
                'name': 'STANDARD FOR MIRRORS',
                'description': 'Use the following mirror material parameters: Diffuse Color: Black | Reflection Color: White | Reflection Glossiness: 0.99 | IOR: 25 | BRDF: Microfacet GTR (GGX)'
              }
            }
          },
          '3': {
            'name': 'TRANSPARENCY',
            'sub': {
              '0': {
                'name': 'EXIST',
                'description': 'There is a transparency here. Check the reference images.'
              },
              '1': {
                'name': 'DOES NOT EXIST',
                'description': 'This transparency doesn t exist on the product. Check the reference images.'
              },
              '2': {
                'name': 'INTENSITY',
                'sub': {
                  '0': {
                    'name': 'INCREASE SLIGHTLY',
                    'description': 'Slightly increase the transparency of this material following the reference.'
                  },
                  '1': {
                    'name': 'INCREASE',
                    'description': 'Increase the transparency of this material following the reference.'
                  },
                  '2': {
                    'name': 'INCREASE HIGHLY',
                    'description': 'Highly increase the transparency of this material following the reference.'
                  },
                  '3': {
                    'name': 'DECREASE SLIGHTLY',
                    'description': 'Slightly decrease the transparency of this material following the reference.'
                  },
                  '4': {
                    'name': 'DECREASE',
                    'description': 'Decrease the transparency of this material following the reference.'
                  },
                  '5': {
                    'name': 'DECREASE HIGHLY',
                    'description': 'Highly decrease the transparency of this material following the reference.'
                  }
                }
              },
              '3': {
                'name': 'BLUR',
                'sub': {
                  '0': {
                    'name': 'INCREASE SLIGHTLY',
                    'description': 'Slightly increase the blur of the transparency of this material following the reference.'
                  },
                  '1': {
                    'name': 'INCREASE',
                    'description': 'Increase the blur of the transparency of this material following the reference.'
                  },
                  '2': {
                    'name': 'INCREASE HIGHLY',
                    'description': 'Highly increase the blur of the transparency of this material following the reference.'
                  },
                  '3': {
                    'name': 'DECREASE SLIGHTLY',
                    'description': 'Slightly decrease the blur of the transparency of this material following the reference.'
                  },
                  '4': {
                    'name': 'DECREASE',
                    'description': 'Decrease the blur of the transparency of this material following the reference.'
                  },
                  '5': {
                    'name': 'DECREASE HIGHLY',
                    'description': 'Highly decrease the blur of the transparency of this material following the reference.'
                  }
                }
              },
              '4': {
                'name': 'STANDARD FOR GLASSES AND WINDOWS',
                'description': 'Use the following glass material parameters: Diffuse Color: r: 10 g: 10 b: 10 | Reflection Color: r: 255 g: 255 b: 255 | Reflection Glossiness: 0.97 | Refraction Color: r: 250 g: 250 b: 250 | Refraction Glossiness: 1.0 | IOR: 1.6 | Affect Shadows: ON | BRDF: Microfacet GTR (GGX)'
              }
            }
          },
          '4': {
            'name': 'BUMP/DISPLACEMENT',
            'sub': {
              '0': {
                'name': 'BUMP',
                'sub': {
                  '0': {
                    'name': 'ADD',
                    'description': 'Add bump on this material. Check the reference images.'
                  },
                  '1': {
                    'name': 'REMOVE',
                    'description': 'Remove the bump on this material. Check the reference images.'
                  },
                  '2': {
                    'name': 'INCREASE',
                    'sub': {
                      '0': {
                        'name': 'SLIGHTLY INCREASE',
                        'description': 'Slightly increase the bump amount on this material according to the reference.'
                      },
                      '1': {
                        'name': 'INCREASE',
                        'description': 'Increase the bump amount on this material according to the reference.'
                      },
                      '2': {
                        'name': 'HIGHLY INCREASE',
                        'description': 'Highly increase the bump amount on this material according to the reference.'
                      }
                    }
                  },
                  '3': {
                    'name': 'DECREASE',
                    'sub': {
                      '0': {
                        'name': 'SLIGHTLY DECREASE',
                        'description': 'Slightly decrease the bump amount on this material according to the reference.'
                      },
                      '1': {
                        'name': 'DECREASE',
                        'description': 'Decrease the bump amount on this material according to the reference.'
                      },
                      '2': {
                        'name': 'HIGHLY DECREASE',
                        'description': 'Highly decrease the bump amount on this material according to the reference.'
                      }
                    }
                  }
                }
              },
              '1': {
                'name': 'DISPLACEMENT',
                'sub': {
                  '0': {
                    'name': 'ADD',
                    'description': 'Add displacement on this material. Check the reference images.'
                  },
                  '1': {
                    'name': 'REMOVE',
                    'description': 'Remove the displacement on this material. Check the reference images.'
                  },
                  '2': {
                    'name': 'INCREASE',
                    'sub': {
                      '0': {
                        'name': 'SLIGHTLY INCREASE',
                        'description': 'Slightly increase the displacement amount on this material according to the reference.'
                      },
                      '1': {
                        'name': 'INCREASE',
                        'description': 'Increase the displacement amount on this material according to the reference.'
                      },
                      '2': {
                        'name': 'HIGHLY INCREASE',
                        'description': 'Highly increase the displacement amount on this material according to the reference.'
                      }
                    }
                  },
                  '3': {
                    'name': 'DECREASE',
                    'sub': {
                      '0': {
                        'name': 'SLIGHTLY DECREASE',
                        'description': 'Slightly decrease the displacement amount on this material according to the reference.'
                      },
                      '1': {
                        'name': 'DECREASE',
                        'description': 'Decrease the displacement amount on this material according to the reference.'
                      },
                      '2': {
                        'name': 'HIGHLY DECREASE',
                        'description': 'Highly decrease the displacement amount on this material according to the reference.'
                      }
                    }
                  }
                }
              }
            }
          },
          '5': {
            'name': 'TRANSLUCENCY',
            'sub': {
              '0': {
                'name': 'ADD',
                'description': 'Add translucency on this material. Check the reference images.'
              },
              '1': {
                'name': 'REMOVE',
                'description': 'Remove the translucency on this material. Check the reference images.'
              },
              '2': {
                'name': 'INCREASE',
                'sub': {
                  '0': {
                    'name': 'SLIGHTLY INCREASE',
                    'description': 'Slightly increase the translucency amount on this material following the reference.'
                  },
                  '1': {
                    'name': 'INCREASE',
                    'description': 'Increase the translucency amount on this material following the reference.'
                  },
                  '2': {
                    'name': 'HIGHLY INCREASE',
                    'description': 'Highly increase the translucency amount on this material following the reference.'
                  }
                }
              },
              '3': {
                'name': 'DECREASE',
                'sub': {
                  '0': {
                    'name': 'SLIGHTLY DECREASE',
                    'description': 'Slightly decrease the translucency amount on this material following the reference.'
                  },
                  '1': {
                    'name': 'DECREASE',
                    'description': 'Decrease the translucency amount on this material following the reference.'
                  },
                  '2': {
                    'name': 'HIGHLY DECREASE',
                    'description': 'Highly decrease the translucency amount on this material following the reference.'
                  }
                }
              }
            }
          }
        }
      },
      '4': {
        'name': 'TEXTURES',
        'sub': {
          '0': {
            'name': 'INCORRECT TEXTURE',
            'description': 'This texture does not match what you see in the product. Use DecoraTools studio to render or your results will turn out to be different!'
          },
          '1': {
            'name': 'FINISHES',
            'sub': {
              '0': {
                'name': 'POLISHED',
                'description': 'The finish of this material has a polished apperance. Check the reference.'
              },
              '1': {
                'name': 'SATIN',
                'description': 'The finish of this material has a satin apperance. Check the reference.'
              },
              '2': {
                'name': 'VARNISHED',
                'description': 'The finish of this material has a varnished apperance. Check the reference.'
              },
              '3': {
                'name': 'MATTE',
                'description': 'The finish of this material has a matte apperance. Check the reference.'
              },
              '4': {
                'name': 'BRUSHED',
                'description': 'The finish of this material has a brushed apperance. Check the reference.'
              },
              '5': {
                'name': 'AGED',
                'description': 'The finish of this material has an aged apperance. Pay attention if there s color/texture difference on the cavities and the edges of the reference product.'
              },
              '6': {
                'name': 'WORNED',
                'description': 'The finish of this material has an worned apperance. Check the reference. Pay attention if there s color/texture difference on the cavities and the edges of the reference product.'
              },
              '7': {
                'name': 'RUSTIC',
                'description': 'The finish of this material has a rustic apperance. Check the reference. Pay attention if there s color/texture difference on the cavities and the edges of the reference product.'
              },
              '8': {
                'name': 'CRACKELED',
                'description': 'The finish of this material has a crackeled apperance. Check the reference. Pay attention if there s color/texture difference on the cavities and the edges of the reference product.'
              },
              '9': {
                'name': 'PATINA',
                'description': 'The finish of this material has a patina apperance. Check the reference. Pay attention if there s color/texture difference on the cavities and the edges of the reference product.'
              }
            }
          },
          '2': {
            'name': 'WOOD',
            'sub': {
              '0': {
                'name': 'GRAIN/GROOVE',
                'sub': {
                  '0': {
                    'name': 'ADD',
                    'description': 'There should be visible wood grains/grooves in this product.'
                  },
                  '1': {
                    'name': 'REMOVE',
                    'description': 'There shouldn t be grains/grooves in this object. Remove it.'
                  },
                  '2': {
                    'name': 'ENHANCE',
                    'description': 'Wood grain/grooves are too mild, make them more evident.'
                  },
                  '3': {
                    'name': 'SOFTEN',
                    'description': 'Wood grain/grooves too evident, make them less pronounced.'
                  },
                  '4': {
                    'name': 'DIRECTION / ORIENTATION',
                    'sub': {
                      '0': {
                        'name': 'HORIZONTAL ORIENTATION',
                        'description': 'Orient the grain/grooves horizontally, as on the product.'
                      },
                      '1': {
                        'name': 'VERTICAL ORIENTATION',
                        'description': 'Orient the grain/grooves vertically, as on the product.'
                      },
                      '2': {
                        'name': 'DIAGONAL ORIENTATION',
                        'description': 'Orient the grain/grooves diagonally, as on the product.'
                      }
                    }
                  },
                  '5': {
                    'name': 'INCORRECT',
                    'description': 'Wood grain/grooves are different from the reference.'
                  }
                }
              },
              '1': {
                'name': 'AGED',
                'sub': {
                  '0': {
                    'name': 'ADD',
                    'description': 'Wood should have an aged look. check the reference.'
                  },
                  '1': {
                    'name': 'REMOVE',
                    'description': 'Wood shouldn t have an aged look. Remove it.'
                  },
                  '2': {
                    'name': 'INCREASE',
                    'description': 'Emphasize the aged look on this wood.'
                  },
                  '3': {
                    'name': 'DECREASE',
                    'description': 'Decrease/reduce the aged look on this wood.'
                  }
                }
              }
            }
          },
          '3': {
            'name': 'METALS',
            'sub': {
              '0': {
                'name': 'IMPROVE',
                'description': 'The material must look like metal. Please Improve it. Tip: Metals normally don t have diffuse color, the color/texture must be applied in the reflection.'
              },
              '1': {
                'name': 'GOLD',
                'description': 'The material should have a Gold apparence. Use DecoraTools studio to render or your results will be different!'
              },
              '2': {
                'name': 'Chrome',
                'description': 'The material should have a Chrome apparence. Use DecoraTools studio to render or your results will be different!'
              },
              '3': {
                'name': 'LEAD',
                'description': 'The material should have a Lead apparence. Use DecoraTools studio to render or your results will be different!.'
              },
              '4': {
                'name': 'ALUMINUM',
                'description': 'The material should have an Aluminum apparence. Use DecoraTools studio to render or your results will be different!'
              },
              '5': {
                'name': 'STEEL',
                'description': 'The material should have a Steel apparence. Use DecoraTools studio to render or your results will be different!'
              },
              '6': {
                'name': 'COPPER',
                'description': 'The material should have a Copper apparence. Use DecoraTools studio to render or your results will be different!.'
              },
              '7': {
                'name': 'NICKEL',
                'description': 'The material should have a Niquel apparence. Use DecoraTools studio to render or your results will be different!.'
              },
              '8': {
                'name': 'BRONZE',
                'description': 'The material should have a Bronze apparence. Use DecoraTools studio to render or your results will be different!.'
              },
              '9': {
                'name': 'BRASS',
                'description': 'The material should have a Brass apparence. Use DecoraTools studio to render or your results will be different!.'
              },
              'A': {
                'name': 'SILVER',
                'description': 'The material should have a Silver apparence. Use DecoraTools studio to render or your results will be different!.'
              },
              'B': {
                'name': 'IRON',
                'description': 'The material should have an Iron apparence. Use DecoraTools studio to render or your results will be different!.'
              },
              'C': {
                'name': 'ALUMINUN',
                'description': 'The material should have an Aluminun apparence. Use DecoraTools studio to render or your results will be different!.'
              }
            }
          },
          '4': {
            'name': 'GLASS',
            'sub': {
              '0': {
                'name': 'IMPROVE',
                'description': 'The material must look like glass. Please Improve it. Tip: Glass normally don t have diffuse color; if there s color on the glass, use Fog Color.'
              },
              '1': {
                'name': 'GLASS TYPES',
                'sub': {
                  '0': {
                    'name': 'SMOOTH GLASS',
                    'description': 'Glass should be smooth. Check the reference.'
                  },
                  '1': {
                    'name': 'DOTTED GLASS',
                    'sub': {
                      '0': {
                        'name': 'VERY DOTTED',
                        'description': 'Glass should be very dotted.'
                      },
                      '1': {
                        'name': 'DOTTED',
                        'description': 'Glass should be dotted.'
                      },
                      '2': {
                        'name': 'SLIGHTLY',
                        'description': 'Glass should be slightly dotted.'
                      }
                    }
                  },
                  '2': {
                    'name': 'REEDED GLASS',
                    'sub': {
                      '0': {
                        'name': 'VERTICAL REED',
                        'description': 'Glass should be vertically reeded.'
                      },
                      '1': {
                        'name': 'HORIZONTAL REED',
                        'description': 'Glass should be horizontally reeded.'
                      },
                      '2': {
                        'name': 'DIAGONAL REED',
                        'description': 'Glass should be diagonally reeded.'
                      }
                    }
                  },
                  '3': {
                    'name': 'ARCTIC GLASS',
                    'description': 'Glass must have an arctic look'
                  },
                  '4': {
                    'name': 'HAMMERED GLASS',
                    'description': 'Glass must have a hammered look'
                  },
                  '5': {
                    'name': 'PRISTAL GLASS',
                    'description': 'Glass must have a pristal look.'
                  },
                  '6': {
                    'name': 'CRAQUELED GLASS',
                    'description': 'Glass must have a craqueled look.'
                  },
                  '7': {
                    'name': 'MILKY GLASS',
                    'description': 'Glass must have a milky look.'
                  },
                  '8': {
                    'name': 'FLORAL GLASS',
                    'description': 'Glass must have a floral look.'
                  },
                  '9': {
                    'name': 'ETCHED GLASS',
                    'description': 'Glass must have an etched look.'
                  }
                }
              },
              '2': {
                'name': 'GLASS COLOR',
                'sub': {
                  '0': {
                    'name': 'COLORLESS GLASS',
                    'description': 'Glass should be colorless, as on the product. Tip: Glass normally don t have diffuse color; if there s color on the glass, use Fog Color.'
                  },
                  '1': {
                    'name': 'GREEN GLASS',
                    'description': 'Glass should be green, as on the product. Tip: Glass normally don t have diffuse color; if there s color on the glass, use Fog Color.'
                  },
                  '2': {
                    'name': 'SMOKED GLASS',
                    'description': 'Glass should be smoked, as on the product. Tip: Glass normally don t have diffuse color; if there s color on the glass, use Fog Color.'
                  },
                  '3': {
                    'name': 'BRONZE GLASS',
                    'description': 'Glass should be bronze, as on the product. Tip: Glass normally don t have diffuse color; if there s color on the glass, use Fog Color.'
                  }
                }
              },
              '3': {
                'name': 'DEFECT',
                'description': 'The glass distortion is incorrect. Possible causes are: IOR incorrect, solido model and hollow reference or vice versa, inverted normals, smoothings groups, etc.'
              },
              '4': {
                'name': 'STANDARD FOR GLASSES AND WINDOWS',
                'description': 'Use the following glass material parameters: Diffuse Color: r: 10 g: 10 b: 10 | Reflection Color: r: 255 g: 255 b: 255 | Reflection Glossiness: 0.99 | Refraction Color: r: 250 g: 250 b: 250 | Refraction Glossiness: 1.0 | IOR: 1.6 | Affect Shadows: ON | BRDF: Microfacet GTR (GGX)'
              }
            }
          },
          '5': {
            'name': 'FLOOR/WALL COVERINGS',
            'sub': {
              '0': {
                'name': 'GROUT',
                'sub': {
                  '0': {
                    'name': 'ADD',
                    'description': 'Add grout on this floor/wall covering with a neutral color.',
                    'helpLink': 'http://home.decoracontent.com/briefing-en/floor-covering'
                  },
                  '1': {
                    'name': 'REMOVE',
                    'description': 'There s no grout on this floor/wall covering. Check the reference.',
                    'helpLink': 'http://home.decoracontent.com/briefing-en/floor-covering'
                  },
                  '2': {
                    'name': 'THICKNESS',
                    'sub': {
                      '0': {
                        'name': 'INCREASE',
                        'sub': {
                          '0': {
                            'name': 'INCREASE SLIGHTLY',
                            'description': 'Slightly increase the thickness of the grout following the reference.',
                            'helpLink': 'http://home.decoracontent.com/briefing-en/floor-covering'
                          },
                          '1': {
                            'name': 'INCREASE',
                            'description': 'Increase the thickness of the grout following the reference.',
                            'helpLink': 'http://home.decoracontent.com/briefing-en/floor-covering'
                          },
                          '2': {
                            'name': 'INCREASE HIGHLY',
                            'description': 'Highly increase the thickness of the grout following the reference.',
                            'helpLink': 'http://home.decoracontent.com/briefing-en/floor-covering'
                          }
                        }
                      },
                      '1': {
                        'name': 'DECREASE',
                        'sub': {
                          '0': {
                            'name': 'DECREASE SLIGHTLY',
                            'description': 'Slightly decrease the thickness of the grout following the reference.',
                            'helpLink': 'http://home.decoracontent.com/briefing-en/floor-covering'
                          },
                          '1': {
                            'name': 'DECREASE',
                            'description': 'Decrease the thickness of the grout following the reference.',
                            'helpLink': 'http://home.decoracontent.com/briefing-en/floor-covering'
                          },
                          '2': {
                            'name': 'DECREASE HIGHLY',
                            'description': 'Highly decrease the thickness of the grout following the reference.',
                            'helpLink': 'http://home.decoracontent.com/briefing-en/floor-covering'
                          }
                        }
                      },
                      '2': {
                        'name': 'UNIFORM',
                        'description': 'The grout thickness in horizontal and vertical must be equal.',
                        'helpLink': 'http://home.decoracontent.com/briefing-en/floor-covering'
                      }
                    }
                  },
                  '3': {
                    'name': 'DEPTH',
                    'sub': {
                      '0': {
                        'name': 'INCREASE',
                        'sub': {
                          '0': {
                            'name': 'INCREASE SLIGHTLY',
                            'description': 'Slightly increase the depth of the grout following the reference.',
                            'helpLink': 'http://home.decoracontent.com/briefing-en/floor-covering'
                          },
                          '1': {
                            'name': 'INCREASE',
                            'description': 'Increase the depth of the grout following the reference.',
                            'helpLink': 'http://home.decoracontent.com/briefing-en/floor-covering'
                          },
                          '2': {
                            'name': 'INCREASE HIGHLY',
                            'description': 'Highly increase the depth of the grout following the reference.',
                            'helpLink': 'http://home.decoracontent.com/briefing-en/floor-covering'
                          }
                        }
                      },
                      '1': {
                        'name': 'DECREASE',
                        'sub': {
                          '0': {
                            'name': 'DECREASE SLIGHTLY',
                            'description': 'Slightly decrease the depth of the grout following the reference.',
                            'helpLink': 'http://home.decoracontent.com/briefing-en/floor-covering'
                          },
                          '1': {
                            'name': 'DECREASE',
                            'description': 'Decrease the depth of the grout following the reference.',
                            'helpLink': 'http://home.decoracontent.com/briefing-en/floor-covering'
                          },
                          '2': {
                            'name': 'DECREASE HIGHLY',
                            'description': 'Highly decrease the depth of the grout following the reference.',
                            'helpLink': 'http://home.decoracontent.com/briefing-en/floor-covering'
                          }
                        }
                      }
                    }
                  },
                  '4': {
                    'name': 'LIGHTEN',
                    'sub': {
                      '0': {
                        'name': 'LIGHTEN SLIGHTLY',
                        'description': 'Slightly lighten the grout following the reference.',
                        'helpLink': 'http://home.decoracontent.com/briefing-en/floor-covering'
                      },
                      '1': {
                        'name': 'LIGHTEN',
                        'description': 'Lighten the grout following the reference.',
                        'helpLink': 'http://home.decoracontent.com/briefing-en/floor-covering'
                      },
                      '2': {
                        'name': 'LIGHTEN HIGHLY',
                        'description': 'Highly lighten the grout following the reference.',
                        'helpLink': 'http://home.decoracontent.com/briefing-en/floor-covering'
                      }
                    }
                  },
                  '5': {
                    'name': 'DARKEN',
                    'sub': {
                      '0': {
                        'name': 'DARKEN SLIGHTLY',
                        'description': 'Slightly darken the grout following the reference.',
                        'helpLink': 'http://home.decoracontent.com/briefing-en/floor-covering'
                      },
                      '1': {
                        'name': 'DARKEN',
                        'description': 'Darken the grout following the reference.',
                        'helpLink': 'http://home.decoracontent.com/briefing-en/floor-covering'
                      },
                      '2': {
                        'name': 'DARKEN HIGHLY',
                        'description': 'Highly darken the grout following the reference.',
                        'helpLink': 'http://home.decoracontent.com/briefing-en/floor-covering'
                      }
                    }
                  }
                }
              },
              '1': {
                'name': 'BONDING PATTERNS',
                'sub': {
                  '0': {
                    'name': 'WRONG',
                    'description': 'The bonding pattern of this floor/wall covering is wrong. Check the bonding pattern of the reference.',
                    'helpLink': 'http://home.decoracontent.com/briefing-en/floor-covering'
                  },
                  '1': {
                    'name': 'STRETCHER/BRICK',
                    'description': 'The bonding pattern of this floor/wall covering is stretcher/brick.',
                    'helpLink': 'http://home.decoracontent.com/briefing-en/floor-covering'
                  },
                  '2': {
                    'name': 'STRETCHER/BRICK 25%',
                    'description': 'The bonding pattern of this floor/wall covering is stretcher/brick 25%.',
                    'helpLink': 'http://home.decoracontent.com/briefing-en/floor-covering'
                  },
                  '3': {
                    'name': 'STACK',
                    'description': 'The bonding pattern of this floor/wall covering is stack.',
                    'helpLink': 'http://home.decoracontent.com/briefing-en/floor-covering'
                  },
                  '4': {
                    'name': 'DIAGONAL',
                    'description': 'The bonding pattern of this floor/wall covering is diagonal.',
                    'helpLink': 'http://home.decoracontent.com/briefing-en/floor-covering'
                  },
                  '5': {
                    'name': 'BASKET WEAVE',
                    'description': 'The bonding pattern of this floor/wall covering is basket weave.',
                    'helpLink': 'http://home.decoracontent.com/briefing-en/floor-covering'
                  },
                  '6': {
                    'name': 'HERRINGBONE',
                    'description': 'The bonding pattern of this floor/wall covering is herringbone.',
                    'helpLink': 'http://home.decoracontent.com/briefing-en/floor-covering'
                  },
                  '7': {
                    'name': 'DIAGONAL HERRINGBONE',
                    'description': 'The bonding pattern of this floor/wall covering is diagonal herringbone.',
                    'helpLink': 'http://home.decoracontent.com/briefing-en/floor-covering'
                  }
                }
              },
              '2': {
                'name': 'VARIATIONS',
                'sub': {
                  '0': {
                    'name': 'SIZE',
                    'sub': {
                      '0': {
                        'name': 'INCREASE',
                        'sub': {
                          '0': {
                            'name': 'INCREASE SLIGHTLY',
                            'description': 'Slightly increase the size variation between the elements of the floor/wall covering, following the reference.',
                            'helpLink': 'http://home.decoracontent.com/briefing-en/floor-covering'
                          },
                          '1': {
                            'name': 'INCREASE',
                            'description': 'Increase the size variation between the elements of the floor/wall covering, following the reference.',
                            'helpLink': 'http://home.decoracontent.com/briefing-en/floor-covering'
                          },
                          '2': {
                            'name': 'INCREASE HIGHLY',
                            'description': 'Highly increase the size variation between the elements of the floor/wall covering, following the reference.',
                            'helpLink': 'http://home.decoracontent.com/briefing-en/floor-covering'
                          }
                        }
                      },
                      '1': {
                        'name': 'DECREASE',
                        'sub': {
                          '0': {
                            'name': 'DECREASE SLIGHTLY',
                            'description': 'Slightly decrease the size variation between the elements of the floor/wall covering, following the reference.',
                            'helpLink': 'http://home.decoracontent.com/briefing-en/floor-covering'
                          },
                          '1': {
                            'name': 'DECREASE',
                            'description': 'Decrease the size variation between the elements of the floor/wall covering, following the reference.',
                            'helpLink': 'http://home.decoracontent.com/briefing-en/floor-covering'
                          },
                          '2': {
                            'name': 'DECREASE HIGHLY',
                            'description': 'Highly decrease the size variation between the elements of the floor/wall covering, following the reference.',
                            'helpLink': 'http://home.decoracontent.com/briefing-en/floor-covering'
                          }
                        }
                      },
                      '2': {
                        'name': 'REMOVE',
                        'description': 'There s no size variation between the elements of the floor/wall covering. Check the reference.',
                        'helpLink': 'http://home.decoracontent.com/briefing-en/floor-covering'
                      }
                    }
                  },
                  '1': {
                    'name': 'DEPTH',
                    'sub': {
                      '0': {
                        'name': 'INCREASE',
                        'sub': {
                          '0': {
                            'name': 'INCREASE SLIGHTLY',
                            'description': 'Slightly increase the depth variation between the elements of the floor/wall covering, following the reference.',
                            'helpLink': 'http://home.decoracontent.com/briefing-en/floor-covering'
                          },
                          '1': {
                            'name': 'INCREASE',
                            'description': 'Increase the depth variation between the elements of the floor/wall covering, following the reference.',
                            'helpLink': 'http://home.decoracontent.com/briefing-en/floor-covering'
                          },
                          '2': {
                            'name': 'INCREASE HIGHLY',
                            'description': 'Highly increase the depth variation between the elements of the floor/wall covering, following the reference.',
                            'helpLink': 'http://home.decoracontent.com/briefing-en/floor-covering'
                          }
                        }
                      },
                      '1': {
                        'name': 'DECREASE',
                        'sub': {
                          '0': {
                            'name': 'DECREASE SLIGHTLY',
                            'description': 'Slightly decrease the depth variation between the elements of the floor/wall covering, following the reference.',
                            'helpLink': 'http://home.decoracontent.com/briefing-en/floor-covering'
                          },
                          '1': {
                            'name': 'DECREASE',
                            'description': 'Decrease the depth variation between the elements of the floor/wall covering, following the reference.',
                            'helpLink': 'http://home.decoracontent.com/briefing-en/floor-covering'
                          },
                          '2': {
                            'name': 'DECREASE HIGHLY',
                            'description': 'Highly decrease the depth variation between the elements of the floor/wall covering, following the reference.',
                            'helpLink': 'http://home.decoracontent.com/briefing-en/floor-covering'
                          }
                        }
                      },
                      '2': {
                        'name': 'REMOVE',
                        'description': 'There s no depth variation between the elements of the floor/wall covering. Check the reference.',
                        'helpLink': 'http://home.decoracontent.com/briefing-en/floor-covering'
                      }
                    }
                  },
                  '2': {
                    'name': 'COLOR',
                    'sub': {
                      '0': {
                        'name': 'INCREASE',
                        'sub': {
                          '0': {
                            'name': 'INCREASE SLIGHTLY',
                            'description': 'Slightly increase the color variation between the elements of the floor/wall covering, following the reference.',
                            'helpLink': 'http://home.decoracontent.com/briefing-en/floor-covering'
                          },
                          '1': {
                            'name': 'INCREASE',
                            'description': 'Increase the color variation between the elements of the floor/wall covering, following the reference.',
                            'helpLink': 'http://home.decoracontent.com/briefing-en/floor-covering'
                          },
                          '2': {
                            'name': 'INCREASE HIGHLY',
                            'description': 'Highly increase the color variation between the elements of the floor/wall covering, following the reference.',
                            'helpLink': 'http://home.decoracontent.com/briefing-en/floor-covering'
                          }
                        }
                      },
                      '1': {
                        'name': 'DECREASE',
                        'sub': {
                          '0': {
                            'name': 'DECREASE SLIGHTLY',
                            'description': 'Slightly decrease the color variation between the elements of the floor/wall covering, following the reference.',
                            'helpLink': 'http://home.decoracontent.com/briefing-en/floor-covering'
                          },
                          '1': {
                            'name': 'DECREASE',
                            'description': 'Decrease the color variation between the elements of the floor/wall covering, following the reference.',
                            'helpLink': 'http://home.decoracontent.com/briefing-en/floor-covering'
                          },
                          '2': {
                            'name': 'DECREASE HIGHLY',
                            'description': 'Highly decrease the color variation between the elements of the floor/wall covering, following the reference.',
                            'helpLink': 'http://home.decoracontent.com/briefing-en/floor-covering'
                          }
                        }
                      },
                      '2': {
                        'name': 'REMOVE',
                        'description': 'There s no color variation between the elements of the floor/wall covering. Check the reference.',
                        'helpLink': 'http://home.decoracontent.com/briefing-en/floor-covering'
                      }
                    }
                  }
                }
              }
            }
          },
          '6': {
            'name': 'FABRICS',
            'sub': {
              '0': {
                'name': 'WOOL',
                'description': 'The material should have a Wool apparence. Use DecoraTools studio to render or your results will be different!'
              },
              '1': {
                'name': 'LINEN',
                'description': 'The material should have a Linen apparence. Use DecoraTools studio to render or your results will be different!'
              },
              '2': {
                'name': 'VELVET',
                'description': 'The material should have a Velvet apparence. Use DecoraTools studio to render or your results will be different!'
              },
              '3': {
                'name': 'SUEDE',
                'description': 'The material should have a Suede apparence. Use DecoraTools studio to render or your results will be different!'
              },
              '4': {
                'name': 'POLYESTER',
                'description': 'The material should have a Polyester apparence. Use DecoraTools studio to render or your results will be different!'
              },
              '5': {
                'name': 'LEATHER',
                'description': 'The material should have a Leather apparence. Use DecoraTools studio to render or your results will be different!'
              },
              '6': {
                'name': 'SILK/SATIN',
                'description': 'The material should have a Silk/Satin apparence. Use DecoraTools studio to render or your results will be different!'
              }
            }
          },
          '7': {
            'name': 'STONES',
            'sub': {
              '1': {
                'name': 'GRANITE',
                'description': 'The material should look like Granite. Use DecoraTools studio to render or your results will be different!.'
              },
              '2': {
                'name': 'MARBLE',
                'description': 'The material should look like Marble. Use DecoraTools studio to render or your results will be different!.'
              }
            }
          }
        }
      },
      '5': {
        'name': 'POSITION / DISTANCE',
        'sub': {
          '0': {
            'name': 'MOVE',
            'sub': {
              '0': {
                'name': 'UP',
                'sub': {
                  '0': {
                    'name': 'A LOT',
                    'description': 'Move this up considerably, as on the product.'
                  },
                  '1': {
                    'name': 'MODERATE',
                    'description': 'Move this up, as on the product.'
                  },
                  '2': {
                    'name': 'SLIGHTLY',
                    'description': 'Move this slightly up, as on the product.'
                  }
                }
              },
              '1': {
                'name': 'DOWN',
                'sub': {
                  '0': {
                    'name': 'A LOT',
                    'description': 'Move this down considerably, as on the product.'
                  },
                  '1': {
                    'name': 'MODERATE',
                    'description': 'Move this down, as on the product.'
                  },
                  '2': {
                    'name': 'SLIGHTLY',
                    'description': 'Move this slightly down, as on the product'
                  }
                }
              },
              '2': {
                'name': 'RIGHT',
                'sub': {
                  '0': {
                    'name': 'A LOT',
                    'description': 'Move this down considerably, as on the product.'
                  },
                  '1': {
                    'name': 'MODERATE',
                    'description': 'Move this down, as on the product.'
                  },
                  '2': {
                    'name': 'SLIGHTLY',
                    'description': 'Move this slightly down, as on the product.'
                  }
                }
              },
              '3': {
                'name': 'LEFT',
                'sub': {
                  '0': {
                    'name': 'A LOT',
                    'description': 'Move this left considerably, as on the product.'
                  },
                  '1': {
                    'name': 'MODERATE',
                    'description': 'Move this left, as on the product.'
                  },
                  '2': {
                    'name': 'SLIGHTLY',
                    'description': 'Move this slightly left, as on the product.'
                  }
                }
              },
              '4': {
                'name': 'DIAGONAL',
                'sub': {
                  '0': {
                    'name': 'UP RIGHT DIAGONAL',
                    'description': 'Move this element in the upper right diagonal direction, as on the product.'
                  },
                  '1': {
                    'name': 'DOWN RIGHT DIAGONAL',
                    'description': 'Move this element in the down right diagonal direction, as on the product.'
                  },
                  '2': {
                    'name': 'UP LEFT DIAGONAL',
                    'description': 'Move this element in the upper left diagonal direction, as on the product.'
                  },
                  '3': {
                    'name': 'DOWN LEFT DIAGONAL',
                    'description': 'Move this element in the down left diagonal direction, as on the product.'
                  }
                }
              },
              '5': {
                'name': 'RAISE/LOWER',
                'sub': {
                  '0': {
                    'name': 'RAISE ELEMENT',
                    'description': 'Raise this element.'
                  },
                  '1': {
                    'name': 'LOWER ELEMENT',
                    'description': 'lower this element.'
                  }
                }
              },
              '6': {
                'name': 'FRONT',
                'sub': {
                  '0': {
                    'name': 'A LOT',
                    'description': 'Move this to the front considerably, as on the product.'
                  },
                  '1': {
                    'name': 'MODERATE',
                    'description': 'Move this to the front, as on the product.'
                  },
                  '2': {
                    'name': 'SLIGHTLY',
                    'description': 'Move this slightly to the front, as on the product.'
                  }
                }
              },
              '7': {
                'name': 'BACK',
                'sub': {
                  '0': {
                    'name': 'A LOT',
                    'description': 'Move this to the back considerably, as on the product.'
                  },
                  '1': {
                    'name': 'MODERATE',
                    'description': 'Move this to the back, as on the product.'
                  },
                  '2': {
                    'name': 'SLIGHTLY',
                    'description': 'Move this slightly to the back, as on the product.'
                  }
                }
              },
              '8': {
                'name': 'CENTER',
                'sub': {
                  '0': {
                    'name': 'HORIZONTAL',
                    'description': 'Center this object horizontally.'
                  },
                  '1': {
                    'name': 'VERTICAL',
                    'description': 'Center this object vertically.'
                  }
                }
              },
              '9': {
                'name': 'ALIGN',
                'sub': {
                  '0': {
                    'name': 'HORIZONTAL',
                    'description': 'These parts must be horizontally aligned.'
                  },
                  '1': {
                    'name': 'VERTICAL',
                    'description': 'These parts must be horizontally aligned.'
                  }
                }
              },
              'A': {
                'name': 'FLIP',
                'description': 'This element must be flipped.'
              }
            }
          },
          '1': {
            'name': 'ROTATE',
            'sub': {
              '0': {
                'name': 'RIGHT',
                'sub': {
                  '0': {
                    'name': 'ROTATE 15o',
                    'description': 'Rotate element 15 degrees to the right.'
                  },
                  '1': {
                    'name': 'ROTATE 30o',
                    'description': 'Rotate element 30 degrees to the right.'
                  },
                  '2': {
                    'name': 'ROTATE 45o',
                    'description': 'Rotate element 45 degrees to the right.'
                  },
                  '3': {
                    'name': 'ROTATE 60o',
                    'description': 'Rotate element 60 degrees to the right.'
                  },
                  '4': {
                    'name': 'ROTATE 90o',
                    'description': 'Rotate element 90 degrees to the right.'
                  },
                  '5': {
                    'name': 'ROTATE 120o',
                    'description': 'Rotate element 120 degrees to the right'
                  },
                  '6': {
                    'name': 'ROTATE 180o',
                    'description': 'Rotate element 180 degrees to the right.'
                  }
                }
              },
              '1': {
                'name': 'LEFT',
                'sub': {
                  '0': {
                    'name': 'ROTATE 15o',
                    'description': 'Rotate element 15 degrees to the left.'
                  },
                  '1': {
                    'name': 'ROTATE 30o',
                    'description': 'Rotate element 30 degrees to the left.'
                  },
                  '2': {
                    'name': 'ROTATE 45o',
                    'description': 'Rotate element 45 degrees to the left.'
                  },
                  '3': {
                    'name': 'ROTATE 60o',
                    'description': 'Rotate element 60 degrees to the left.'
                  },
                  '4': {
                    'name': 'ROTATE 90o',
                    'description': 'Rotate element 90 degrees to the left.'
                  },
                  '5': {
                    'name': 'ROTATE 120o',
                    'description': 'Rotate element 120 degrees to the left.'
                  },
                  '6': {
                    'name': 'ROTATE 180o',
                    'description': 'Rotate element 180 degrees to the left.'
                  }
                }
              }
            }
          },
          '2': {
            'name': 'ORGANIZE / POSITION',
            'sub': {
              '0': {
                'name': 'POSITION UPRIGHT',
                'description': 'Position the element upright.'
              },
              '1': {
                'name': 'POSITION LYING',
                'description': 'Position the element lying.'
              },
              '2': {
                'name': 'POSITION FACING',
                'description': 'Position the element in front view (ortogonal).'
              },
              '3': {
                'name': 'ORGANIZE THE KIT ALIGNED',
                'description': 'Organize the elements that make up the product in line.'
              },
              '4': {
                'name': 'ORGANIZE THE KIT REALISTICALLY',
                'description': 'Position the elements composed realistically, as in an environment.'
              },
              '5': {
                'name': 'ORGANIZE THE KIT LIKE REFERENCE',
                'description': 'Position the elements like they are in the reference.'
              }
            }
          },
          '3': {
            'name': 'OPENINGS',
            'sub': {
              '0': {
                'name': 'OPENED',
                'description': 'This door/window must be opened.'
              },
              '1': {
                'name': 'CLOSED',
                'description': 'This door/window must be closed.'
              },
              '2': {
                'name': 'AJAR',
                'description': 'This door/window must be ajar.'
              }
            }
          }
        }
      },
      '6': {
        'name': 'LIGHTS',
        'sub': {
          '0': {
            'name': 'ADD',
            'description': 'Add a Vraylight.',
            'helpLink': 'http://home.decoracontent.com/briefing-en/sconces'
          },
          '1': {
            'name': 'REMOVE',
            'description': 'Remove this Vraylight.',
            'helpLink': 'http://home.decoracontent.com/briefing-en/sconces'
          },
          '2': {
            'name': 'INTENSITY',
            'sub': {
              '0': {
                'name': 'INCREASE SLIGHTLY',
                'description': 'Slightly increase the intensity of this light.',
                'helpLink': 'http://home.decoracontent.com/briefing-en/sconces'
              },
              '1': {
                'name': 'INCREASE',
                'description': 'Increase the intensity of this light.',
                'helpLink': 'http://home.decoracontent.com/briefing-en/sconces'
              },
              '2': {
                'name': 'INCREASE HIGHLY',
                'description': 'Highly increase the intensity of this light.',
                'helpLink': 'http://home.decoracontent.com/briefing-en/sconces'
              },
              '3': {
                'name': 'DECREASE SLIGHTLY',
                'description': 'Slightly decrease the intensity of this light.',
                'helpLink': 'http://home.decoracontent.com/briefing-en/sconces'
              },
              '4': {
                'name': 'DECREASE',
                'description': 'Decrease the intensity of this light.',
                'helpLink': 'http://home.decoracontent.com/briefing-en/sconces'
              },
              '5': {
                'name': 'DECREASE HIGHLY',
                'description': 'Highly decrease the intensity of this light.',
                'helpLink': 'http://home.decoracontent.com/briefing-en/sconces'
              }
            }
          },
          '3': {
            'name': 'COLOR TEMPERATURE',
            'sub': {
              '0': {
                'name': 'WARMER',
                'sub': {
                  '0': {
                    'name': 'INCREASE SLIGHTLY',
                    'description': 'Set a slightly warmer color temperature for this light. Use DecoraTools studio to render or your results will turn out to be different!',
                    'helpLink': 'http://home.decoracontent.com/briefing-en/sconces'
                  },
                  '1': {
                    'name': 'INCREASE',
                    'description': 'Set a warmer color temperature for this light. Use DecoraTools studio to render or your results will turn out to be different!',
                    'helpLink': 'http://home.decoracontent.com/briefing-en/sconces'
                  },
                  '2': {
                    'name': 'INCREASE HIGHLY',
                    'description': 'Set a highly warmer color temperature for this light. Use DecoraTools studio to render or your results will turn out to be different!',
                    'helpLink': 'http://home.decoracontent.com/briefing-en/sconces'
                  }
                }
              },
              '1': {
                'name': 'COOLER',
                'sub': {
                  '0': {
                    'name': 'DECREASE SLIGHTLY',
                    'description': 'Set a slightly cooler color temperature for this light. Use DecoraTools studio to render or your results will turn out to be different!',
                    'helpLink': 'http://home.decoracontent.com/briefing-en/sconces'
                  },
                  '1': {
                    'name': 'DECREASE',
                    'description': 'Set a cooler color temperature for this light. Use DecoraTools studio to render or your results will turn out to be different!',
                    'helpLink': 'http://home.decoracontent.com/briefing-en/sconces'
                  },
                  '2': {
                    'name': 'DECREASE HIGHLY',
                    'description': 'Set a highly cooler color temperature for this light. Use DecoraTools studio to render or your results will turn out to be different!',
                    'helpLink': 'http://home.decoracontent.com/briefing-en/sconces'
                  }
                }
              }
            }
          },
          '4': {
            'name': 'LIGHT SOURCE',
            'description': 'The light bulb and/or the fillament must be the modeled following the reference.',
            'helpLink': 'http://home.decoracontent.com/briefing-en/sconces'
          },
          '5': {
            'name': 'DIFFUSION',
            'sub': {
              '0': {
                'name': 'INCREASE SLIGHTLY',
                'description': 'The illumination is a bit ponctual, it needs to be slightly more diffuse.'
              },
              '1': {
                'name': 'INCREASE',
                'description': 'The illumination is ponctual, it needs to be more diffuse.'
              },
              '2': {
                'name': 'INCREASE HIGHLY',
                'description': 'The illumination is a too ponctual, it needs to be highly more diffuse.'
              },
              '3': {
                'name': 'DECREASE SLIGHTLY',
                'description': 'The illumination is a bit diffuse, it needs to be slightly more ponctual.'
              },
              '4': {
                'name': 'DECREASE',
                'description': 'The illumination is diffuse, it needs to be more ponctual.'
              },
              '5': {
                'name': 'DECREASE HIGHLY',
                'description': 'The illumination is a too diffuse, it needs to be highly more pontual.'
              }
            }
          }
        }
      },
      '7': {
        'name': 'MESH',
        'sub': {
          '0': {
            'name': 'INCREASE SUBDIVISIONS',
            'description': 'Increase the amount of subdivisions of this element.'
          },
          '1': {
            'name': 'DECREASE SUBDIVISIONS',
            'description': 'Decrease the amount of subdivisions of this element.'
          },
          '2': {
            'name': 'ARTIFACT',
            'description': 'There is an artifact on the model. Please fix it. Attention with smoothing groups because they can cause problems on reflection and shading.'
          }
        }
      }
    }
  }
};

@Component({
  selector: 'dec-mesh-qa',
  templateUrl: './dec-mesh-qa.component.html',
  styleUrls: ['./dec-mesh-qa.component.scss']
})
export class DecMeshQaComponent {

  @Input()
  public isProfessional: boolean;

  @Input()
  public glb: any;

  @Input()
  public mesh: any;

  @ViewChild('iframeUnity') iframeUnity: ElementRef<HTMLIFrameElement>;

  @Output() updateTagStructure: EventEmitter<any> = new EventEmitter<any>();

  constructor(public decConfig: DecConfigurationService) {
    window.addEventListener('message', this.ReceiveMessage, false);
  }

  ReceiveMessage = (event: any) => {
    const { data } = event;

    switch (data.type) {
      case 'Ready':
        this.SetData();
        break;
      case 'SetTagStructure':
        this.SetTagStructure(data.payload);
        break;
      case 'AddTag':
        this.AddTag(data.payload);
        break;
      case 'EditTag':
        this.EditTag(data.payload);
        break;
      case 'RemoveTag':
        this.RemoveTag(data.payload);
        break;
      default:
        break;
    }
  }

  SetTagStructure = (tagStructureString: string): void => {
    this.mesh = JSON.parse(tagStructureString);
    this.updateTagStructure.emit(this.mesh);
  }

  AddTag = (tagWrapperString: string): void => {
    const tagWrapper: TagWrapper = JSON.parse(tagWrapperString);

    switch (tagWrapper.Context) {
      case enumTagWrapperContext.Wireframe:
      case enumTagWrapperContext.Matcap:
      case enumTagWrapperContext.Map:
        this.mesh[tagWrapper.Context][tagWrapper.Kit].push(tagWrapper.Tag);
        break;
      default:
        this.mesh[tagWrapper.Context][tagWrapper.Kit][tagWrapper.SubContext].push(tagWrapper.Tag);
        break;
    }

    this.updateTagStructure.emit(this.mesh);
  }

  EditTag = (tagWrapperString: string): void => {
    const tagWrapper: TagWrapper = JSON.parse(tagWrapperString);

    switch (tagWrapper.Context) {
      case enumTagWrapperContext.Wireframe:
      case enumTagWrapperContext.Matcap:
      case enumTagWrapperContext.Map:
        this.mesh[tagWrapper.Context][tagWrapper.Kit] =
          this.mesh[tagWrapper.Context][tagWrapper.Kit].map(tag => tag.Id === tagWrapper.Tag.Id ? tagWrapper.Tag : tag);
        break;
      default:
        this.mesh[tagWrapper.Context][tagWrapper.Kit][tagWrapper.SubContext] =
          this.mesh[tagWrapper.Context][tagWrapper.Kit][tagWrapper.SubContext].map(tag => tag.Id === tagWrapper.Tag.Id ? tagWrapper.Tag : tag);
        break;
    }

    this.updateTagStructure.emit(this.mesh);
  }

  RemoveTag = (tagWrapperString: string): void => {
    const tagWrapper: TagWrapper = JSON.parse(tagWrapperString);

    switch (tagWrapper.Context) {
      case enumTagWrapperContext.Wireframe:
      case enumTagWrapperContext.Matcap:
      case enumTagWrapperContext.Map:
        this.mesh[tagWrapper.Context][tagWrapper.Kit] =
          this.mesh[tagWrapper.Context][tagWrapper.Kit].filter(tag => tag.Id !== tagWrapper.Tag.Id);
        break;
      default:
        this.mesh[tagWrapper.Context][tagWrapper.Kit][tagWrapper.SubContext] =
          this.mesh[tagWrapper.Context][tagWrapper.Kit][tagWrapper.SubContext].filter(tag => tag.Id !== tagWrapper.Tag.Id);
        break;
    }

    this.updateTagStructure.emit(this.mesh);
  }

  //// Unity Functions
  SetData = (): void => {
    const model = this.glb.fileUrl.replace('http://', 'https://')
    const tags = this.mesh || null;
    const editMode = !this.isProfessional;

    const fullMesh = { editMode, model, tags, ...meshBase };
    this.iframeUnity.nativeElement.contentWindow.postMessage({ type: 'SetData', payload: fullMesh }, '*');
  }
  EnableEdit = (enable: boolean): void => {
    this.iframeUnity.nativeElement.contentWindow.postMessage({ type: 'EnableEdit', payload: enable }, '*');
  }
  //// Unity Functions
}
