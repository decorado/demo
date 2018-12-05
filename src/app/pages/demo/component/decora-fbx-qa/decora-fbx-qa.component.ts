import { Component } from '@angular/core';

interface RootObject {
  type: 'TagsModel';
  WireframeTags: Marker[][];
  MatcapTags: Marker[][];
  MapTags: Marker[][];
  MaterialsTags: Marker[][][];
}

interface Marker {
  type: 'PointTag' | 'AreaTag' | 'RulerTag';
  MeshPoint?: MeshPoint;
  Cod: number;
  ErrorCode?: string;
  Description: string;
  CameraAngle: CameraAngle;
  Size?: Size;
  End?: MeshPoint;
  Start?: MeshPoint;
  Distance?: number;
  RightDistance?: string;
}

interface Size {
  type: 'Vector2Json';
  x: number;
  y: number;
}

interface CameraAngle {
  type: 'CameraAngleModel';
  Position: MeshPoint;
  Rotation: MeshPoint;
  Orthographic: boolean;
}

interface MeshPoint {
  type: 'Vector3Json';
  x: number;
  y: number;
  z: number;
}

@Component({
  selector: 'app-decora-fbx-qa',
  templateUrl: './decora-fbx-qa.component.html',
  styleUrls: ['./decora-fbx-qa.component.scss']
})
export class DecoraFbxQaComponent {

  public json: RootObject = {
    'type': 'TagsModel',
    'WireframeTags': [
      [{
        'type': 'PointTag',
        'MeshPoint': {
          'type': 'Vector3Json',
          'x': 1,
          'y': 1,
          'z': 1
        },
        'Cod': 0,
        'ErrorCode': '00000',
        'Description': 'This is the description of the error elected',
        'CameraAngle': {
          'type': 'CameraAngleModel',
          'Position': {
            'type': 'Vector3Json',
            'x': 1,
            'y': 1,
            'z': 1
          },
          'Rotation': {
            'type': 'Vector3Json',
            'x': 0,
            'y': 0,
            'z': 0
          },
          'Orthographic': false
        }
      },
      {
        'type': 'AreaTag',
        'Size': {
          'type': 'Vector2Json',
          'x': 1,
          'y': 1
        },
        'MeshPoint': {
          'type': 'Vector3Json',
          'x': 0,
          'y': 0,
          'z': 0
        },
        'Cod': 0,
        'ErrorCode': '00000',
        'Description': 'This is the description of the error elected',
        'CameraAngle': {
          'type': 'CameraAngleModel',
          'Position': {
            'type': 'Vector3Json',
            'x': 1,
            'y': 1,
            'z': 1
          },
          'Rotation': {
            'type': 'Vector3Json',
            'x': 0,
            'y': 0,
            'z': 0
          },
          'Orthographic': false
        }
      },
      {
        'type': 'RulerTag',
        'End': {
          'type': 'Vector3Json',
          'x': 1,
          'y': 1,
          'z': 1
        },
        'Start': {
          'type': 'Vector3Json',
          'x': 0,
          'y': 0,
          'z': 0
        },
        'Distance': 0,
        'RightDistance': '2',
        'Cod': 0,
        'Description': 'will not be used probably',
        'CameraAngle': {
          'type': 'CameraAngleModel',
          'Position': {
            'type': 'Vector3Json',
            'x': 1,
            'y': 1,
            'z': 1
          },
          'Rotation': {
            'type': 'Vector3Json',
            'x': 0,
            'y': 0,
            'z': 0
          },
          'Orthographic': false
        }
      }
      ]
    ],
    'MatcapTags': [
      [{
        'type': 'PointTag',
        'MeshPoint': {
          'type': 'Vector3Json',
          'x': 1,
          'y': 1,
          'z': 1
        },
        'Cod': 0,
        'ErrorCode': '00000',
        'Description': 'This is the description of the error elected',
        'CameraAngle': {
          'type': 'CameraAngleModel',
          'Position': {
            'type': 'Vector3Json',
            'x': 1,
            'y': 1,
            'z': 1
          },
          'Rotation': {
            'type': 'Vector3Json',
            'x': 0,
            'y': 0,
            'z': 0
          },
          'Orthographic': false
        }
      },
      {
        'type': 'AreaTag',
        'Size': {
          'type': 'Vector2Json',
          'x': 1,
          'y': 1
        },
        'MeshPoint': {
          'type': 'Vector3Json',
          'x': 0,
          'y': 0,
          'z': 0
        },
        'Cod': 0,
        'ErrorCode': '00000',
        'Description': 'This is the description of the error elected',
        'CameraAngle': {
          'type': 'CameraAngleModel',
          'Position': {
            'type': 'Vector3Json',
            'x': 1,
            'y': 1,
            'z': 1
          },
          'Rotation': {
            'type': 'Vector3Json',
            'x': 0,
            'y': 0,
            'z': 0
          },
          'Orthographic': false
        }
      },
      {
        'type': 'RulerTag',
        'End': {
          'type': 'Vector3Json',
          'x': 1,
          'y': 1,
          'z': 1
        },
        'Start': {
          'type': 'Vector3Json',
          'x': 0,
          'y': 0,
          'z': 0
        },
        'Distance': 0,
        'RightDistance': '2',
        'Cod': 0,
        'Description': 'will not be used probably',
        'CameraAngle': {
          'type': 'CameraAngleModel',
          'Position': {
            'type': 'Vector3Json',
            'x': 1,
            'y': 1,
            'z': 1
          },
          'Rotation': {
            'type': 'Vector3Json',
            'x': 0,
            'y': 0,
            'z': 0
          },
          'Orthographic': false
        }
      }
      ]
    ],
    'MapTags': [
      [{
        'type': 'PointTag',
        'MeshPoint': {
          'type': 'Vector3Json',
          'x': 1,
          'y': 1,
          'z': 1
        },
        'Cod': 0,
        'ErrorCode': '00000',
        'Description': 'This is the description of the error elected',
        'CameraAngle': {
          'type': 'CameraAngleModel',
          'Position': {
            'type': 'Vector3Json',
            'x': 1,
            'y': 1,
            'z': 1
          },
          'Rotation': {
            'type': 'Vector3Json',
            'x': 0,
            'y': 0,
            'z': 0
          },
          'Orthographic': false
        }
      },
      {
        'type': 'AreaTag',
        'Size': {
          'type': 'Vector2Json',
          'x': 1,
          'y': 1
        },
        'MeshPoint': {
          'type': 'Vector3Json',
          'x': 0,
          'y': 0,
          'z': 0
        },
        'Cod': 0,
        'ErrorCode': '00000',
        'Description': 'This is the description of the error elected',
        'CameraAngle': {
          'type': 'CameraAngleModel',
          'Position': {
            'type': 'Vector3Json',
            'x': 1,
            'y': 1,
            'z': 1
          },
          'Rotation': {
            'type': 'Vector3Json',
            'x': 0,
            'y': 0,
            'z': 0
          },
          'Orthographic': false
        }
      },
      {
        'type': 'RulerTag',
        'End': {
          'type': 'Vector3Json',
          'x': 1,
          'y': 1,
          'z': 1
        },
        'Start': {
          'type': 'Vector3Json',
          'x': 0,
          'y': 0,
          'z': 0
        },
        'Distance': 0,
        'RightDistance': '2',
        'Cod': 0,
        'Description': 'will not be used probably',
        'CameraAngle': {
          'type': 'CameraAngleModel',
          'Position': {
            'type': 'Vector3Json',
            'x': 1,
            'y': 1,
            'z': 1
          },
          'Rotation': {
            'type': 'Vector3Json',
            'x': 0,
            'y': 0,
            'z': 0
          },
          'Orthographic': false
        }
      }
      ]
    ],
    'MaterialsTags': [
      [
        [{
          'type': 'PointTag',
          'MeshPoint': {
            'type': 'Vector3Json',
            'x': 1,
            'y': 1,
            'z': 1
          },
          'Cod': 0,
          'ErrorCode': '00000',
          'Description': 'This is the description of the error elected',
          'CameraAngle': {
            'type': 'CameraAngleModel',
            'Position': {
              'type': 'Vector3Json',
              'x': 1,
              'y': 1,
              'z': 1
            },
            'Rotation': {
              'type': 'Vector3Json',
              'x': 0,
              'y': 0,
              'z': 0
            },
            'Orthographic': false
          }
        },
        {
          'type': 'AreaTag',
          'Size': {
            'type': 'Vector2Json',
            'x': 1,
            'y': 1
          },
          'MeshPoint': {
            'type': 'Vector3Json',
            'x': 0,
            'y': 0,
            'z': 0
          },
          'Cod': 0,
          'ErrorCode': '00000',
          'Description': 'This is the description of the error elected',
          'CameraAngle': {
            'type': 'CameraAngleModel',
            'Position': {
              'type': 'Vector3Json',
              'x': 1,
              'y': 1,
              'z': 1
            },
            'Rotation': {
              'type': 'Vector3Json',
              'x': 0,
              'y': 0,
              'z': 0
            },
            'Orthographic': false
          }
        },
        {
          'type': 'RulerTag',
          'End': {
            'type': 'Vector3Json',
            'x': 1,
            'y': 1,
            'z': 1
          },
          'Start': {
            'type': 'Vector3Json',
            'x': 0,
            'y': 0,
            'z': 0
          },
          'Distance': 0,
          'RightDistance': '2',
          'Cod': 0,
          'Description': 'will not be used probably',
          'CameraAngle': {
            'type': 'CameraAngleModel',
            'Position': {
              'type': 'Vector3Json',
              'x': 1,
              'y': 1,
              'z': 1
            },
            'Rotation': {
              'type': 'Vector3Json',
              'x': 0,
              'y': 0,
              'z': 0
            },
            'Orthographic': false
          }
        }
        ]
      ]
    ]
  };

  constructor() {
    window.addEventListener('message', event => {
      console.log('Parent event: ', event);
    });
  }

  public sendToWebGL(): void {
    const iFrame = (<HTMLIFrameElement>document.querySelector('#iFrameFbx'));
    iFrame.contentWindow.postMessage({ nome: 'Tutuca' }, '*');
  }

}
