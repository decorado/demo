import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-decora-zoom-marks-demo',
  templateUrl: './decora-zoom-marks-demo.component.html',
  styleUrls: ['./decora-zoom-marks-demo.component.scss']
})
export class DecoraZoomMarksDemoComponent implements OnInit {

  markedObj = {
    file: {
      extension: 'jpg',
      fileBasePath: '2018/5/29/5b0cf3d418ab527a27ef718b.jpg',
      fileBaseUrl: 'https://s3.amazonaws.com/decora-platform-1-nv/2018/5/29/5b0cf3d418ab527a27ef718b',
      fileUrl: 'https://s3.amazonaws.com/decora-platform-1-nv/2018/5/29/5b0cf3d418ab527a27ef718b.jpg',
      id: '5b0cf3d418ab527a27ef718b',
      originalName: '7I5RdLBE03Q.jpg',
      size: 325983,
      order: 1
    },
    comments: [
      {
        id: 1,
        comment: '1163',
        feedback: '',
        status: '',
        coordinates: [32, 56],
        version: 21
      },
      {
        id: 2,
        comment: '2K5',
        feedback: '',
        status: '',
        coordinates: [28, 40, 53, 32],
        version: 21
      },
      {
        id: 3,
        comment: '73',
        feedback: '',
        status: '',
        coordinates: [54, 40],
        version: 23
      },
      {
        id: 4,
        comment: '2C3',
        feedback: '',
        status: '',
        coordinates: [12, 67, 32, 45],
        version: 23
      }
    ]
  };

  markedObjs: any[];

  marker: any;

  qaMode: boolean;

  constructor() {

    this.markedObjs = [
      {
        file: {
          extension: 'jpg',
          fileBasePath: '2018/5/29/5b0cf3d418ab527a27ef718b.jpg',
          fileBaseUrl: 'https://s3.amazonaws.com/decora-platform-1-nv/2018/5/29/5b0cf3d418ab527a27ef718b',
          fileUrl: 'https://s3.amazonaws.com/decora-platform-1-nv/2018/5/29/5b0cf3d418ab527a27ef718b.jpg',
          id: '5b0cf3d418ab527a27ef718b',
          originalName: '7I5RdLBE03Q.jpg',
          size: 325983,
          order: 1
        },
        comments: [
          {
            id: 1,
            comment: '1163',
            feedback: '',
            status: '',
            coordinates: [32, 56],
            version: 21
          },
          {
            id: 5,
            comment: '2K5',
            feedback: '',
            status: '',
            coordinates: [28, 40, 53, 32],
            version: 21
          },
          {
            id: 3,
            comment: '73',
            feedback: '',
            status: '',
            coordinates: [54, 40],
            version: 23
          },
          {
            id: 4,
            comment: '2C3',
            feedback: '',
            status: '',
            coordinates: [12, 67, 32, 45],
            version: 23
          }
        ],
        zoomAreas: [
          {
            feedback: '',
            renderShot: {
              file: '',
              comments: [
                {
                  comment: '',
                  feedback: '',
                  status: '',
                  coordinates: [68, 12]
                },
                {
                  comment: '',
                  feedback: '',
                  status: '',
                  coordinates: [68, 12, 34, 45]
                }
              ]
            },
            referenceShot: {
              file: '',
              comments: [
                {
                  comment: '',
                  feedback: '',
                  status: '',
                  coordinates: [12, 78]
                }
              ]
            },
            status: '',
            id: 2,
            coordinates: [56, 70]
          }
        ]
      }, {
        file: {
          extension: 'jpg',
          fileBasePath: '2018/5/29/5b0cf3d418ab527a27ef718b.jpg',
          fileBaseUrl: 'https://s3.amazonaws.com/decora-platform-1-nv/2018/5/29/5b0cf3d418ab527a27ef718b',
          fileUrl: 'https://s3.amazonaws.com/decora-platform-1-nv/2018/5/29/5b0cf3d418ab527a27ef718b.jpg',
          id: '5b0cf3d418ab527a27ef718b',
          originalName: '7I5RdLBE03Q.jpg',
          size: 325983,
          order: 1
        },
        comments: [
          {
            id: 1,
            comment: '1163',
            feedback: '',
            status: '',
            coordinates: [32, 56],
            version: 21
          },
          {
            id: 5,
            comment: '2K5',
            feedback: '',
            status: '',
            coordinates: [28, 40, 53, 32],
            version: 21
          },
          {
            id: 3,
            comment: '73',
            feedback: '',
            status: '',
            coordinates: [54, 40],
            version: 23
          },
          {
            id: 4,
            comment: '2C3',
            feedback: '',
            status: '',
            coordinates: [12, 67, 32, 45],
            version: 23
          }
        ],
        zoomAreas: [
          {
            feedback: '',
            renderShot: {
              file: '',
              comments: [
                {
                  comment: '',
                  feedback: '',
                  status: '',
                  coordinates: [68, 12]
                },
                {
                  comment: '',
                  feedback: '',
                  status: '',
                  coordinates: [68, 12, 34, 45]
                }
              ]
            },
            referenceShot: {
              file: '',
              comments: [
                {
                  comment: '',
                  feedback: '',
                  status: '',
                  coordinates: [12, 78]
                }
              ]
            },
            status: '',
            id: 2,
            coordinates: [56, 70]
          }
        ]
      }, {
        file: {
          extension: 'jpg',
          fileBasePath: '2018/5/29/5b0cf3d418ab527a27ef718b.jpg',
          fileBaseUrl: 'https://s3.amazonaws.com/decora-platform-1-nv/2018/5/29/5b0cf3d418ab527a27ef718b',
          fileUrl: 'https://s3.amazonaws.com/decora-platform-1-nv/2018/5/29/5b0cf3d418ab527a27ef718b.jpg',
          id: '5b0cf3d418ab527a27ef718b',
          originalName: '7I5RdLBE03Q.jpg',
          size: 325983,
          order: 1
        },
        comments: [
          {
            id: 1,
            comment: '1163',
            feedback: '',
            status: '',
            coordinates: [32, 56],
            version: 21
          },
          {
            id: 5,
            comment: '2K5',
            feedback: '',
            status: '',
            coordinates: [28, 40, 53, 32],
            version: 21
          },
          {
            id: 3,
            comment: '73',
            feedback: '',
            status: '',
            coordinates: [54, 40],
            version: 23
          },
          {
            id: 4,
            comment: '2C3',
            feedback: '',
            status: '',
            coordinates: [12, 67, 32, 45],
            version: 23
          }
        ],
        zoomAreas: [
          {
            feedback: '',
            renderShot: {
              file: '',
              comments: [
                {
                  comment: '',
                  feedback: '',
                  status: '',
                  coordinates: [68, 12]
                },
                {
                  comment: '',
                  feedback: '',
                  status: '',
                  coordinates: [68, 12, 34, 45]
                }
              ]
            },
            referenceShot: {
              file: '',
              comments: [
                {
                  comment: '',
                  feedback: '',
                  status: '',
                  coordinates: [12, 78]
                }
              ]
            },
            status: '',
            id: 2,
            coordinates: [56, 70]
          }
        ]
      }, {
        file: {
          extension: 'jpg',
          fileBasePath: '2018/5/29/5b0cf3d418ab527a27ef718b.jpg',
          fileBaseUrl: 'https://s3.amazonaws.com/decora-platform-1-nv/2018/5/29/5b0cf3d418ab527a27ef718b',
          fileUrl: 'https://s3.amazonaws.com/decora-platform-1-nv/2018/5/29/5b0cf3d418ab527a27ef718b.jpg',
          id: '5b0cf3d418ab527a27ef718b',
          originalName: '7I5RdLBE03Q.jpg',
          size: 325983,
          order: 1
        },
        comments: [
          {
            id: 1,
            comment: '1163',
            feedback: '',
            status: '',
            coordinates: [32, 56],
            version: 21
          },
          {
            id: 5,
            comment: '2K5',
            feedback: '',
            status: '',
            coordinates: [28, 40, 53, 32],
            version: 21
          },
          {
            id: 3,
            comment: '73',
            feedback: '',
            status: '',
            coordinates: [54, 40],
            version: 23
          },
          {
            id: 4,
            comment: '2C3',
            feedback: '',
            status: '',
            coordinates: [12, 67, 32, 45],
            version: 23
          }
        ],
        zoomAreas: [
          {
            feedback: '',
            renderShot: {
              file: '',
              comments: [
                {
                  comment: '',
                  feedback: '',
                  status: '',
                  coordinates: [68, 12]
                },
                {
                  comment: '',
                  feedback: '',
                  status: '',
                  coordinates: [68, 12, 34, 45]
                }
              ]
            },
            referenceShot: {
              file: '',
              comments: [
                {
                  comment: '',
                  feedback: '',
                  status: '',
                  coordinates: [12, 78]
                }
              ]
            },
            status: '',
            id: 2,
            coordinates: [56, 70]
          }
        ]
      }, {
        file: {
          extension: 'jpg',
          fileBasePath: '2018/5/29/5b0cf3d418ab527a27ef718b.jpg',
          fileBaseUrl: 'https://s3.amazonaws.com/decora-platform-1-nv/2018/5/29/5b0cf3d418ab527a27ef718b',
          fileUrl: 'https://s3.amazonaws.com/decora-platform-1-nv/2018/5/29/5b0cf3d418ab527a27ef718b.jpg',
          id: '5b0cf3d418ab527a27ef718b',
          originalName: '7I5RdLBE03Q.jpg',
          size: 325983,
          order: 1
        },
        comments: [
          {
            id: 1,
            comment: '1163',
            feedback: '',
            status: '',
            coordinates: [32, 56],
            version: 21
          },
          {
            id: 5,
            comment: '2K5',
            feedback: '',
            status: '',
            coordinates: [28, 40, 53, 32],
            version: 21
          },
          {
            id: 3,
            comment: '73',
            feedback: '',
            status: '',
            coordinates: [54, 40],
            version: 23
          },
          {
            id: 4,
            comment: '2C3',
            feedback: '',
            status: '',
            coordinates: [12, 67, 32, 45],
            version: 23
          }
        ],
        zoomAreas: [
          {
            feedback: '',
            renderShot: {
              file: '',
              comments: [
                {
                  comment: '',
                  feedback: '',
                  status: '',
                  coordinates: [68, 12]
                },
                {
                  comment: '',
                  feedback: '',
                  status: '',
                  coordinates: [68, 12, 34, 45]
                }
              ]
            },
            referenceShot: {
              file: '',
              comments: [
                {
                  comment: '',
                  feedback: '',
                  status: '',
                  coordinates: [12, 78]
                }
              ]
            },
            status: '',
            id: 2,
            coordinates: [56, 70]
          }
        ]
      }, {
        file: {
          extension: 'jpg',
          fileBasePath: '2018/5/29/5b0cf3d418ab527a27ef718b.jpg',
          fileBaseUrl: 'https://s3.amazonaws.com/decora-platform-1-nv/2018/5/29/5b0cf3d418ab527a27ef718b',
          fileUrl: 'https://s3.amazonaws.com/decora-platform-1-nv/2018/5/29/5b0cf3d418ab527a27ef718b.jpg',
          id: '5b0cf3d418ab527a27ef718b',
          originalName: '7I5RdLBE03Q.jpg',
          size: 325983,
          order: 1
        },
        comments: [
          {
            id: 1,
            comment: '1163',
            feedback: '',
            status: '',
            coordinates: [32, 56],
            version: 21
          },
          {
            id: 5,
            comment: '2K5',
            feedback: '',
            status: '',
            coordinates: [28, 40, 53, 32],
            version: 21
          },
          {
            id: 3,
            comment: '73',
            feedback: '',
            status: '',
            coordinates: [54, 40],
            version: 23
          },
          {
            id: 4,
            comment: '2C3',
            feedback: '',
            status: '',
            coordinates: [12, 67, 32, 45],
            version: 23
          }
        ],
        zoomAreas: [
          {
            feedback: '',
            renderShot: {
              file: '',
              comments: [
                {
                  comment: '',
                  feedback: '',
                  status: '',
                  coordinates: [68, 12]
                },
                {
                  comment: '',
                  feedback: '',
                  status: '',
                  coordinates: [68, 12, 34, 45]
                }
              ]
            },
            referenceShot: {
              file: '',
              comments: [
                {
                  comment: '',
                  feedback: '',
                  status: '',
                  coordinates: [12, 78]
                }
              ]
            },
            status: '',
            id: 2,
            coordinates: [56, 70]
          }
        ]
      }, {
        file: {
          extension: 'jpg',
          fileBasePath: '2018/5/29/5b0cf3d418ab527a27ef718b.jpg',
          fileBaseUrl: 'https://s3.amazonaws.com/decora-platform-1-nv/2018/5/29/5b0cf3d418ab527a27ef718b',
          fileUrl: 'https://s3.amazonaws.com/decora-platform-1-nv/2018/5/29/5b0cf3d418ab527a27ef718b.jpg',
          id: '5b0cf3d418ab527a27ef718b',
          originalName: '7I5RdLBE03Q.jpg',
          size: 325983,
          order: 1
        },
        comments: [
          {
            id: 1,
            comment: '1163',
            feedback: '',
            status: '',
            coordinates: [32, 56],
            version: 21
          },
          {
            id: 5,
            comment: '2K5',
            feedback: '',
            status: '',
            coordinates: [28, 40, 53, 32],
            version: 21
          },
          {
            id: 3,
            comment: '73',
            feedback: '',
            status: '',
            coordinates: [54, 40],
            version: 23
          },
          {
            id: 4,
            comment: '2C3',
            feedback: '',
            status: '',
            coordinates: [12, 67, 32, 45],
            version: 23
          }
        ],
        zoomAreas: [
          {
            feedback: '',
            renderShot: {
              file: '',
              comments: [
                {
                  comment: '',
                  feedback: '',
                  status: '',
                  coordinates: [68, 12]
                },
                {
                  comment: '',
                  feedback: '',
                  status: '',
                  coordinates: [68, 12, 34, 45]
                }
              ]
            },
            referenceShot: {
              file: '',
              comments: [
                {
                  comment: '',
                  feedback: '',
                  status: '',
                  coordinates: [12, 78]
                }
              ]
            },
            status: '',
            id: 2,
            coordinates: [56, 70]
          }
        ]
      }, {
        file: {
          extension: 'jpg',
          fileBasePath: '2018/5/29/5b0cf3d418ab527a27ef718b.jpg',
          fileBaseUrl: 'https://s3.amazonaws.com/decora-platform-1-nv/2018/5/29/5b0cf3d418ab527a27ef718b',
          fileUrl: 'https://s3.amazonaws.com/decora-platform-1-nv/2018/5/29/5b0cf3d418ab527a27ef718b.jpg',
          id: '5b0cf3d418ab527a27ef718b',
          originalName: '7I5RdLBE03Q.jpg',
          size: 325983,
          order: 1
        },
        comments: [
          {
            id: 1,
            comment: '1163',
            feedback: '',
            status: '',
            coordinates: [32, 56],
            version: 21
          },
          {
            id: 5,
            comment: '2K5',
            feedback: '',
            status: '',
            coordinates: [28, 40, 53, 32],
            version: 21
          },
          {
            id: 3,
            comment: '73',
            feedback: '',
            status: '',
            coordinates: [54, 40],
            version: 23
          },
          {
            id: 4,
            comment: '2C3',
            feedback: '',
            status: '',
            coordinates: [12, 67, 32, 45],
            version: 23
          }
        ],
        zoomAreas: [
          {
            feedback: '',
            renderShot: {
              file: '',
              comments: [
                {
                  comment: '',
                  feedback: '',
                  status: '',
                  coordinates: [68, 12]
                },
                {
                  comment: '',
                  feedback: '',
                  status: '',
                  coordinates: [68, 12, 34, 45]
                }
              ]
            },
            referenceShot: {
              file: '',
              comments: [
                {
                  comment: '',
                  feedback: '',
                  status: '',
                  coordinates: [12, 78]
                }
              ]
            },
            status: '',
            id: 2,
            coordinates: [56, 70]
          }
        ]
      }, {
        file: {
          extension: 'jpg',
          fileBasePath: '2018/5/29/5b0cf3d418ab527a27ef718b.jpg',
          fileBaseUrl: 'https://s3.amazonaws.com/decora-platform-1-nv/2018/5/29/5b0cf3d418ab527a27ef718b',
          fileUrl: 'https://s3.amazonaws.com/decora-platform-1-nv/2018/5/29/5b0cf3d418ab527a27ef718b.jpg',
          id: '5b0cf3d418ab527a27ef718b',
          originalName: '7I5RdLBE03Q.jpg',
          size: 325983,
          order: 1
        },
        comments: [
          {
            id: 1,
            comment: '1163',
            feedback: '',
            status: '',
            coordinates: [32, 56],
            version: 21
          },
          {
            id: 5,
            comment: '2K5',
            feedback: '',
            status: '',
            coordinates: [28, 40, 53, 32],
            version: 21
          },
          {
            id: 3,
            comment: '73',
            feedback: '',
            status: '',
            coordinates: [54, 40],
            version: 23
          },
          {
            id: 4,
            comment: '2C3',
            feedback: '',
            status: '',
            coordinates: [12, 67, 32, 45],
            version: 23
          }
        ],
        zoomAreas: [
          {
            feedback: '',
            renderShot: {
              file: '',
              comments: [
                {
                  comment: '',
                  feedback: '',
                  status: '',
                  coordinates: [68, 12]
                },
                {
                  comment: '',
                  feedback: '',
                  status: '',
                  coordinates: [68, 12, 34, 45]
                }
              ]
            },
            referenceShot: {
              file: '',
              comments: [
                {
                  comment: '',
                  feedback: '',
                  status: '',
                  coordinates: [12, 78]
                }
              ]
            },
            status: '',
            id: 2,
            coordinates: [56, 70]
          }
        ]
      }, {
        file: {
          extension: 'jpg',
          fileBasePath: '2018/5/29/5b0cf3d418ab527a27ef718b.jpg',
          fileBaseUrl: 'https://s3.amazonaws.com/decora-platform-1-nv/2018/5/29/5b0cf3d418ab527a27ef718b',
          fileUrl: 'https://s3.amazonaws.com/decora-platform-1-nv/2018/5/29/5b0cf3d418ab527a27ef718b.jpg',
          id: '5b0cf3d418ab527a27ef718b',
          originalName: '7I5RdLBE03Q.jpg',
          size: 325983,
          order: 1
        },
        comments: [
          {
            id: 1,
            comment: '1163',
            feedback: '',
            status: '',
            coordinates: [32, 56],
            version: 21
          },
          {
            id: 5,
            comment: '2K5',
            feedback: '',
            status: '',
            coordinates: [28, 40, 53, 32],
            version: 21
          },
          {
            id: 3,
            comment: '73',
            feedback: '',
            status: '',
            coordinates: [54, 40],
            version: 23
          },
          {
            id: 4,
            comment: '2C3',
            feedback: '',
            status: '',
            coordinates: [12, 67, 32, 45],
            version: 23
          }
        ],
        zoomAreas: [
          {
            feedback: '',
            renderShot: {
              file: '',
              comments: [
                {
                  comment: '',
                  feedback: '',
                  status: '',
                  coordinates: [68, 12]
                },
                {
                  comment: '',
                  feedback: '',
                  status: '',
                  coordinates: [68, 12, 34, 45]
                }
              ]
            },
            referenceShot: {
              file: '',
              comments: [
                {
                  comment: '',
                  feedback: '',
                  status: '',
                  coordinates: [12, 78]
                }
              ]
            },
            status: '',
            id: 2,
            coordinates: [56, 70]
          }
        ]
      }, {
        file: {
          extension: 'jpg',
          fileBasePath: '2018/5/29/5b0cf3d418ab527a27ef718b.jpg',
          fileBaseUrl: 'https://s3.amazonaws.com/decora-platform-1-nv/2018/5/29/5b0cf3d418ab527a27ef718b',
          fileUrl: 'https://s3.amazonaws.com/decora-platform-1-nv/2018/5/29/5b0cf3d418ab527a27ef718b.jpg',
          id: '5b0cf3d418ab527a27ef718b',
          originalName: '7I5RdLBE03Q.jpg',
          size: 325983,
          order: 1
        },
        comments: [
          {
            id: 1,
            comment: '1163',
            feedback: '',
            status: '',
            coordinates: [32, 56],
            version: 21
          },
          {
            id: 5,
            comment: '2K5',
            feedback: '',
            status: '',
            coordinates: [28, 40, 53, 32],
            version: 21
          },
          {
            id: 3,
            comment: '73',
            feedback: '',
            status: '',
            coordinates: [54, 40],
            version: 23
          },
          {
            id: 4,
            comment: '2C3',
            feedback: '',
            status: '',
            coordinates: [12, 67, 32, 45],
            version: 23
          }
        ],
        zoomAreas: [
          {
            feedback: '',
            renderShot: {
              file: '',
              comments: [
                {
                  comment: '',
                  feedback: '',
                  status: '',
                  coordinates: [68, 12]
                },
                {
                  comment: '',
                  feedback: '',
                  status: '',
                  coordinates: [68, 12, 34, 45]
                }
              ]
            },
            referenceShot: {
              file: '',
              comments: [
                {
                  comment: '',
                  feedback: '',
                  status: '',
                  coordinates: [12, 78]
                }
              ]
            },
            status: '',
            id: 2,
            coordinates: [56, 70]
          }
        ]
      }
    ];

  }

  ngOnInit() { }

}
