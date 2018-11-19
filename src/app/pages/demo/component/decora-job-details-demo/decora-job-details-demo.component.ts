import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-decora-job-details-demo',
  templateUrl: './decora-job-details-demo.component.html',
  styleUrls: ['./decora-job-details-demo.component.scss']
})
export class DecoraJobDetailsDemoComponent implements OnInit {


  job = {
    "id": 180862,
    "created": "2018-09-28T18:16:04.481+0000",
    "status": "DENIED",
    "type": "MODELING",
    "costValue": 48,
    "company": {
      "id": 206,
      "name": "Overstock"
    },
    "project": {
      "id": 1095,
      "title": "#overstock_carson_palm_pine"
    },
    "product": {
      "id": "206:24186619-000-000",
      "name": "Silver Orchid Olivia Glam Grey 9-drawer Dresser Grey",
      "sku": "24186619-000-000"
    },
    "studio": {
      "id": 2,
      "name": "Estúdio General",
      "builderProductType": "GENERAL"
    },
    "priority": false,
    "professional": {
      "id": 20396,
      "name": "Eunicelli Marie",
      "i18n": "PT_BR"
    },
    "rank": 0,
    "squad": "Furniture1121",
    "complexity": "REGULAR_5",
    "observation": "pedir somente a bordinha/vincos e borda em baixo ta errada - round dado - bruna \nSempre lembrem de ver as cores no render branco :)\n\n\nteste moni",
    "rounds": [
      {
        "id": "5bead46c030f61221078843d",
        "number": 1,
        "status": "DENIED",
        "renderStatus": "RENDER_DONE",
        "start": "2018-10-03T15:31:02.578+0000",
        "end": "2018-10-04T18:31:02.578+0000",
        "delivered": "2018-10-04T19:10:00.217+0000",
        "qualityAssurance": {
          "id": "5bead46c030f61221078843d",
          "qualityAgent": {
            "id": 29964,
            "name": "Gabriela Barden",
            "i18n": "PT_BR"
          },
          "reviewAgent": {},
          "status": "DENIED",
          "denyReason": "QUALITY_ASSURANCE_2_DECORA",
          "renders": [
            {
              "file": {
                "id": "5bb651b5af4d0b12a26497b0",
                "extension": "jpg",
                "size": 3833710,
                "originalName": "5bb651cf49d9bc2ab78f5f8d2136953269714803933.jpg",
                "fileBasePath": "2018/10/4/5bb651b5af4d0b12a26497b0.jpg",
                "fileUrl": "http://s3.amazonaws.com/decora-platform-1-nv/2018/10/4/5bb651b5af4d0b12a26497b0.jpg"
              },
              "tags": [
                {
                  "comment": "40",
                  "coordinates": [
                    23.70967741935484,
                    57.90322580645161,
                    20.32258064516129,
                    54.83870967741935
                  ],
                  "reference": "1"
                },
                {
                  "comment": "2d7",
                  "coordinates": [
                    5,
                    75.48387096774194,
                    1.4516129032258065,
                    71.45161290322581
                  ],
                  "reference": "2"
                },
                {
                  "comment": "000",
                  "coordinates": [
                    15.483870967741936,
                    35.96774193548387,
                    12.903225806451612,
                    28.70967741935484
                  ],
                  "reference": "3"
                },
                {
                  "comment": "2D7",
                  "coordinates": [
                    4.838709677419355,
                    25.806451612903224,
                    0.8064516129032258,
                    22.096774193548388
                  ],
                  "reference": "4"
                },
                {
                  "comment": "30753",
                  "coordinates": [
                    6.129032258064516,
                    42.90322580645161,
                    6.129032258064516,
                    42.90322580645161
                  ],
                  "reference": "5"
                },
                {
                  "comment": "3020",
                  "coordinates": [
                    6.290322580645161,
                    46.12903225806452,
                    6.290322580645161,
                    46.12903225806452
                  ],
                  "reference": "6"
                }
              ]
            },
            {
              "file": {
                "id": "5bb651b5af4d0b12a26497b1",
                "extension": "jpg",
                "size": 2281158,
                "originalName": "5bb651d049d9bc2ab78f5f929170406685906655811.jpg",
                "fileBasePath": "2018/10/4/5bb651b5af4d0b12a26497b1.jpg",
                "fileUrl": "http://s3.amazonaws.com/decora-platform-1-nv/2018/10/4/5bb651b5af4d0b12a26497b1.jpg"
              },
              "tags": []
            },
            {
              "file": {
                "id": "5bb651b5af4d0b12a26497b2",
                "extension": "jpg",
                "size": 156302,
                "originalName": "5bb651d049d9bc2ab78f5f902412155504271244081.jpg",
                "fileBasePath": "2018/10/4/5bb651b5af4d0b12a26497b2.jpg",
                "fileUrl": "http://s3.amazonaws.com/decora-platform-1-nv/2018/10/4/5bb651b5af4d0b12a26497b2.jpg"
              },
              "tags": []
            },
            {
              "file": {
                "id": "5bb651b5af4d0b12a26497b3",
                "extension": "jpg",
                "size": 139698,
                "originalName": "5bb651d049d9bc2ab78f5f977104647560540524575.jpg",
                "fileBasePath": "2018/10/4/5bb651b5af4d0b12a26497b3.jpg",
                "fileUrl": "http://s3.amazonaws.com/decora-platform-1-nv/2018/10/4/5bb651b5af4d0b12a26497b3.jpg"
              },
              "tags": []
            },
            {
              "file": {
                "id": "5bb651b5af4d0b12a26497b4",
                "extension": "jpg",
                "size": 128322,
                "originalName": "5bb651d049d9bc2ab78f5f951691835437076558304.jpg",
                "fileBasePath": "2018/10/4/5bb651b5af4d0b12a26497b4.jpg",
                "fileUrl": "http://s3.amazonaws.com/decora-platform-1-nv/2018/10/4/5bb651b5af4d0b12a26497b4.jpg"
              },
              "tags": []
            },
            {
              "file": {
                "id": "5bb651b5af4d0b12a26497b5",
                "extension": "jpg",
                "size": 233752,
                "originalName": "5bb651d149d9bc2ab78f5f9c4239140690939535361.jpg",
                "fileBasePath": "2018/10/4/5bb651b5af4d0b12a26497b5.jpg",
                "fileUrl": "http://s3.amazonaws.com/decora-platform-1-nv/2018/10/4/5bb651b5af4d0b12a26497b5.jpg"
              },
              "tags": []
            },
            {
              "file": {
                "id": "5bb651b5af4d0b12a26497b6",
                "extension": "jpg",
                "size": 309856,
                "originalName": "5bb651d149d9bc2ab78f5f998035457959292807951.jpg",
                "fileBasePath": "2018/10/4/5bb651b5af4d0b12a26497b6.jpg",
                "fileUrl": "http://s3.amazonaws.com/decora-platform-1-nv/2018/10/4/5bb651b5af4d0b12a26497b6.jpg"
              },
              "tags": []
            },
            {
              "file": {
                "id": "5bb651b5af4d0b12a26497b7",
                "extension": "jpg",
                "size": 294170,
                "originalName": "5bb651d249d9bc2ab78f5fa14035745051682049931.jpg",
                "fileBasePath": "2018/10/4/5bb651b5af4d0b12a26497b7.jpg",
                "fileUrl": "http://s3.amazonaws.com/decora-platform-1-nv/2018/10/4/5bb651b5af4d0b12a26497b7.jpg"
              },
              "tags": []
            },
            {
              "file": {
                "id": "5bb651b5af4d0b12a26497b8",
                "extension": "jpg",
                "size": 197768,
                "originalName": "5bb651d149d9bc2ab78f5f9e8215206871873183131.jpg",
                "fileBasePath": "2018/10/4/5bb651b5af4d0b12a26497b8.jpg",
                "fileUrl": "http://s3.amazonaws.com/decora-platform-1-nv/2018/10/4/5bb651b5af4d0b12a26497b8.jpg"
              },
              "tags": []
            },
            {
              "file": {
                "id": "5bb651b5af4d0b12a26497b9",
                "extension": "jpg",
                "size": 190655,
                "originalName": "5bb651d249d9bc2ab78f5fa4323532866188551840.jpg",
                "fileBasePath": "2018/10/4/5bb651b5af4d0b12a26497b9.jpg",
                "fileUrl": "http://s3.amazonaws.com/decora-platform-1-nv/2018/10/4/5bb651b5af4d0b12a26497b9.jpg"
              },
              "tags": []
            },
            {
              "file": {
                "id": "5bb651b5af4d0b12a26497ba",
                "extension": "jpg",
                "size": 223172,
                "originalName": "5bb651cf49d9bc2ab78f5f843085089490251177451.jpg",
                "fileBasePath": "2018/10/4/5bb651b5af4d0b12a26497ba.jpg",
                "fileUrl": "http://s3.amazonaws.com/decora-platform-1-nv/2018/10/4/5bb651b5af4d0b12a26497ba.jpg"
              },
              "tags": []
            },
            {
              "file": {
                "id": "5bb651b5af4d0b12a26497bb",
                "extension": "jpg",
                "size": 222822,
                "originalName": "5bb651ce49d9bc2ab78f5f821196680146103939586.jpg",
                "fileBasePath": "2018/10/4/5bb651b5af4d0b12a26497bb.jpg",
                "fileUrl": "http://s3.amazonaws.com/decora-platform-1-nv/2018/10/4/5bb651b5af4d0b12a26497bb.jpg"
              },
              "tags": []
            },
            {
              "file": {
                "id": "5bb651b5af4d0b12a26497bc",
                "extension": "jpg",
                "size": 296043,
                "originalName": "5bb651cf49d9bc2ab78f5f884328355201037343888.jpg",
                "fileBasePath": "2018/10/4/5bb651b5af4d0b12a26497bc.jpg",
                "fileUrl": "http://s3.amazonaws.com/decora-platform-1-nv/2018/10/4/5bb651b5af4d0b12a26497bc.jpg"
              },
              "tags": []
            },
            {
              "file": {
                "id": "5bb651b5af4d0b12a26497bd",
                "extension": "jpg",
                "size": 128365,
                "originalName": "5bb651cf49d9bc2ab78f5f868487112806918986009.jpg",
                "fileBasePath": "2018/10/4/5bb651b5af4d0b12a26497bd.jpg",
                "fileUrl": "http://s3.amazonaws.com/decora-platform-1-nv/2018/10/4/5bb651b5af4d0b12a26497bd.jpg"
              },
              "tags": []
            },
            {
              "file": {
                "id": "5bb651b5af4d0b12a26497be",
                "extension": "jpg",
                "size": 122359,
                "originalName": "5bb651cf49d9bc2ab78f5f8b2500246963191272713.jpg",
                "fileBasePath": "2018/10/4/5bb651b5af4d0b12a26497be.jpg",
                "fileUrl": "http://s3.amazonaws.com/decora-platform-1-nv/2018/10/4/5bb651b5af4d0b12a26497be.jpg"
              },
              "tags": []
            },
            {
              "file": {
                "id": "5bb651b5af4d0b12a26497bf",
                "extension": "jpg",
                "size": 118814,
                "originalName": "5bb651cf49d9bc2ab78f5f8a4277518032845003038.jpg",
                "fileBasePath": "2018/10/4/5bb651b5af4d0b12a26497bf.jpg",
                "fileUrl": "http://s3.amazonaws.com/decora-platform-1-nv/2018/10/4/5bb651b5af4d0b12a26497bf.jpg"
              },
              "tags": []
            }
          ]
        },
        "modelCubeX": 176.055,
        "modelCubeY": 44.3953,
        "modelCubeZ": 99.0821
      },
      {
        "id": "5bead46c030f61221078843e",
        "number": 2,
        "status": "DENIED",
        "renderStatus": "RENDER_DONE",
        "start": "2018-10-05T19:51:48.204+0000",
        "end": "2018-10-06T22:51:48.204+0000",
        "delivered": "2018-10-09T03:30:00.203+0000",
        "qualityAssurance": {
          "id": "5bead46c030f61221078843e",
          "qualityAgent": {
            "id": 29374,
            "name": "Felipe Donaduzzi",
            "i18n": "PT_BR"
          },
          "reviewAgent": {},
          "status": "DENIED",
          "denyReason": "QUALITY_ASSURANCE_2_DECORA",
          "renders": [
            {
              "file": {
                "id": "5bbc1ff2af4d0b12a26cc024",
                "extension": "jpg",
                "size": 3833530,
                "originalName": "5bbc200eb9d2551aeb828ccc5195490785791897609.jpg",
                "fileBasePath": "2018/10/9/5bbc1ff2af4d0b12a26cc024.jpg",
                "fileUrl": "http://s3.amazonaws.com/decora-platform-1-nv/2018/10/9/5bbc1ff2af4d0b12a26cc024.jpg"
              },
              "tags": []
            },
            {
              "file": {
                "id": "5bbc1ff2af4d0b12a26cc025",
                "extension": "jpg",
                "size": 2344723,
                "originalName": "5bbc200eb9d2551aeb828ccd2773311268895582914.jpg",
                "fileBasePath": "2018/10/9/5bbc1ff2af4d0b12a26cc025.jpg",
                "fileUrl": "http://s3.amazonaws.com/decora-platform-1-nv/2018/10/9/5bbc1ff2af4d0b12a26cc025.jpg"
              },
              "tags": [
                {
                  "comment": "2D7",
                  "coordinates": [
                    14.838709677419354,
                    34.516129032258064,
                    8.225806451612904,
                    29.03225806451613
                  ],
                  "reference": "1"
                }
              ]
            },
            {
              "file": {
                "id": "5bbc1ff2af4d0b12a26cc026",
                "extension": "jpg",
                "size": 160943,
                "originalName": "5bbc200eb9d2551aeb828cca2170595601109184815.jpg",
                "fileBasePath": "2018/10/9/5bbc1ff2af4d0b12a26cc026.jpg",
                "fileUrl": "http://s3.amazonaws.com/decora-platform-1-nv/2018/10/9/5bbc1ff2af4d0b12a26cc026.jpg"
              },
              "tags": []
            },
            {
              "file": {
                "id": "5bbc1ff2af4d0b12a26cc027",
                "extension": "jpg",
                "size": 140129,
                "originalName": "5bbc200eb9d2551aeb828ccb2941056364070395348.jpg",
                "fileBasePath": "2018/10/9/5bbc1ff2af4d0b12a26cc027.jpg",
                "fileUrl": "http://s3.amazonaws.com/decora-platform-1-nv/2018/10/9/5bbc1ff2af4d0b12a26cc027.jpg"
              },
              "tags": []
            },
            {
              "file": {
                "id": "5bbc1ff2af4d0b12a26cc028",
                "extension": "jpg",
                "size": 129392,
                "originalName": "5bbc200fb9d2551aeb828cd18499065646687003199.jpg",
                "fileBasePath": "2018/10/9/5bbc1ff2af4d0b12a26cc028.jpg",
                "fileUrl": "http://s3.amazonaws.com/decora-platform-1-nv/2018/10/9/5bbc1ff2af4d0b12a26cc028.jpg"
              },
              "tags": []
            },
            {
              "file": {
                "id": "5bbc1ff2af4d0b12a26cc029",
                "extension": "jpg",
                "size": 235488,
                "originalName": "5bbc2010b9d2551aeb828cd25312949688877035680.jpg",
                "fileBasePath": "2018/10/9/5bbc1ff2af4d0b12a26cc029.jpg",
                "fileUrl": "http://s3.amazonaws.com/decora-platform-1-nv/2018/10/9/5bbc1ff2af4d0b12a26cc029.jpg"
              },
              "tags": []
            },
            {
              "file": {
                "id": "5bbc1ff2af4d0b12a26cc02a",
                "extension": "jpg",
                "size": 310891,
                "originalName": "5bbc200db9d2551aeb828cc82931945241780516993.jpg",
                "fileBasePath": "2018/10/9/5bbc1ff2af4d0b12a26cc02a.jpg",
                "fileUrl": "http://s3.amazonaws.com/decora-platform-1-nv/2018/10/9/5bbc1ff2af4d0b12a26cc02a.jpg"
              },
              "tags": []
            },
            {
              "file": {
                "id": "5bbc1ff2af4d0b12a26cc02b",
                "extension": "jpg",
                "size": 291020,
                "originalName": "5bbc200db9d2551aeb828cc62156615496774575086.jpg",
                "fileBasePath": "2018/10/9/5bbc1ff2af4d0b12a26cc02b.jpg",
                "fileUrl": "http://s3.amazonaws.com/decora-platform-1-nv/2018/10/9/5bbc1ff2af4d0b12a26cc02b.jpg"
              },
              "tags": []
            },
            {
              "file": {
                "id": "5bbc1ff2af4d0b12a26cc02c",
                "extension": "jpg",
                "size": 209532,
                "originalName": "5bbc200db9d2551aeb828cc71966905907994626918.jpg",
                "fileBasePath": "2018/10/9/5bbc1ff2af4d0b12a26cc02c.jpg",
                "fileUrl": "http://s3.amazonaws.com/decora-platform-1-nv/2018/10/9/5bbc1ff2af4d0b12a26cc02c.jpg"
              },
              "tags": []
            },
            {
              "file": {
                "id": "5bbc1ff2af4d0b12a26cc02d",
                "extension": "jpg",
                "size": 194555,
                "originalName": "5bbc200cb9d2551aeb828cc47200335875588798772.jpg",
                "fileBasePath": "2018/10/9/5bbc1ff2af4d0b12a26cc02d.jpg",
                "fileUrl": "http://s3.amazonaws.com/decora-platform-1-nv/2018/10/9/5bbc1ff2af4d0b12a26cc02d.jpg"
              },
              "tags": []
            },
            {
              "file": {
                "id": "5bbc1ff2af4d0b12a26cc02e",
                "extension": "jpg",
                "size": 227726,
                "originalName": "5bbc200cb9d2551aeb828cc54401366856815977084.jpg",
                "fileBasePath": "2018/10/9/5bbc1ff2af4d0b12a26cc02e.jpg",
                "fileUrl": "http://s3.amazonaws.com/decora-platform-1-nv/2018/10/9/5bbc1ff2af4d0b12a26cc02e.jpg"
              },
              "tags": []
            },
            {
              "file": {
                "id": "5bbc1ff2af4d0b12a26cc02f",
                "extension": "jpg",
                "size": 226958,
                "originalName": "5bbc200cb9d2551aeb828cc36595607864183710300.jpg",
                "fileBasePath": "2018/10/9/5bbc1ff2af4d0b12a26cc02f.jpg",
                "fileUrl": "http://s3.amazonaws.com/decora-platform-1-nv/2018/10/9/5bbc1ff2af4d0b12a26cc02f.jpg"
              },
              "tags": []
            },
            {
              "file": {
                "id": "5bbc1ff2af4d0b12a26cc030",
                "extension": "jpg",
                "size": 312148,
                "originalName": "5bbc200db9d2551aeb828cc99018795783477016850.jpg",
                "fileBasePath": "2018/10/9/5bbc1ff2af4d0b12a26cc030.jpg",
                "fileUrl": "http://s3.amazonaws.com/decora-platform-1-nv/2018/10/9/5bbc1ff2af4d0b12a26cc030.jpg"
              },
              "tags": []
            },
            {
              "file": {
                "id": "5bbc1ff2af4d0b12a26cc031",
                "extension": "jpg",
                "size": 128419,
                "originalName": "5bbc200fb9d2551aeb828ccf6442049593332071360.jpg",
                "fileBasePath": "2018/10/9/5bbc1ff2af4d0b12a26cc031.jpg",
                "fileUrl": "http://s3.amazonaws.com/decora-platform-1-nv/2018/10/9/5bbc1ff2af4d0b12a26cc031.jpg"
              },
              "tags": []
            },
            {
              "file": {
                "id": "5bbc1ff2af4d0b12a26cc032",
                "extension": "jpg",
                "size": 123948,
                "originalName": "5bbc200fb9d2551aeb828cd05096502899458968938.jpg",
                "fileBasePath": "2018/10/9/5bbc1ff2af4d0b12a26cc032.jpg",
                "fileUrl": "http://s3.amazonaws.com/decora-platform-1-nv/2018/10/9/5bbc1ff2af4d0b12a26cc032.jpg"
              },
              "tags": []
            },
            {
              "file": {
                "id": "5bbc1ff2af4d0b12a26cc033",
                "extension": "jpg",
                "size": 118805,
                "originalName": "5bbc200fb9d2551aeb828cce3127573406863367937.jpg",
                "fileBasePath": "2018/10/9/5bbc1ff2af4d0b12a26cc033.jpg",
                "fileUrl": "http://s3.amazonaws.com/decora-platform-1-nv/2018/10/9/5bbc1ff2af4d0b12a26cc033.jpg"
              },
              "tags": []
            }
          ]
        },
        "modelCubeX": 172.71,
        "modelCubeY": 43.5517,
        "modelCubeZ": 97.1993
      },
      {
        "id": "5bead46c030f61221078843c",
        "number": 3,
        "status": "DENIED",
        "renderStatus": "RENDER_DONE",
        "start": "2018-10-11T13:52:01.977+0000",
        "end": "2018-10-12T19:52:01.977+0000",
        "delivered": "2018-10-12T20:30:00.202+0000",
        "qualityAssurance": {
          "id": "5bead465030f61221078842e",
          "qualityAgent": {
            "id": 35168,
            "name": "Simone Wildner",
            "i18n": "EN_US"
          },
          "reviewAgent": {},
          "status": "DENIED",
          "start": "2018-11-13T13:51:32.352+0000",
          "finish": "2018-11-13T15:13:31.787+0000",
          "type": "CROWD",
          "renders": [
            {
              "file": {
                "id": "5bc0c004af4d0b12a275045b",
                "extension": "jpg",
                "size": 3844806,
                "originalName": "5bc0c01fb9d2556864012e645921934977424728057.jpg",
                "fileBasePath": "2018/10/12/5bc0c004af4d0b12a275045b.jpg",
                "fileUrl": "http://s3.amazonaws.com/decora-platform-1-nv/2018/10/12/5bc0c004af4d0b12a275045b.jpg"
              },
              "tags": [
                {
                  "id": "5beaea1be0eabc0001e40e06",
                  "comment": "11111",
                  "coordinates": [
                    15.94,
                    38.12,
                    51.88,
                    47.68
                  ],
                  "reference": "1"
                }
              ],
              "zoomAreas": [
                {
                  "id": "5beaea1be0eabc0001e40e08",
                  "renderShot": {
                    "position": {
                      "x": 345,
                      "y": 345
                    },
                    "zoomScale": 1,
                    "file": {
                      "id": "5bc0c004af4d0b12a275045b",
                      "extension": "jpg",
                      "size": 3844806,
                      "originalName": "5bc0c01fb9d2556864012e645921934977424728057.jpg",
                      "fileBasePath": "2018/10/12/5bc0c004af4d0b12a275045b.jpg",
                      "fileUrl": "http://s3.amazonaws.com/decora-platform-1-nv/2018/10/12/5bc0c004af4d0b12a275045b.jpg"
                    },
                    "tags": [
                      {
                        "id": "5beaea1be0eabc0001e40e09",
                        "comment": "222",
                        "coordinates": [
                          90.14,
                          21.45,
                          97.97,
                          34.93
                        ],
                        "reference": "1"
                      }
                    ]
                  },
                  "referenceShot": {
                    "position": {
                      "x": 345,
                      "y": 345
                    },
                    "zoomScale": 1,
                    "file": {
                      "id": "5b6d93e2e35ccc11a2ce4a62",
                      "extension": "jpg",
                      "size": 68119,
                      "originalName": "5b6d93e2e35ccc11a2ce4a611337165977782751752.jpg",
                      "fileBasePath": "2018/8/10/5b6d93e2e35ccc11a2ce4a62.jpg",
                      "fileUrl": "http://s3.amazonaws.com/decora-platform-1-nv/2018/8/10/5b6d93e2e35ccc11a2ce4a62.jpg"
                    },
                    "tags": [
                      {
                        "id": "5beaea1be0eabc0001e40e0a",
                        "coordinates": [
                          77.54,
                          24.35,
                          84.93,
                          35.8
                        ],
                        "reference": "1.1"
                      }
                    ]
                  },
                  "coordinates": [
                    16,
                    38
                  ],
                  "reference": "2"
                }
              ]
            },
            {
              "file": {
                "id": "5bc0c004af4d0b12a275045c",
                "extension": "jpg",
                "size": 2345177,
                "originalName": "5bc0c01fb9d2556864012e663403495293304447304.jpg",
                "fileBasePath": "2018/10/12/5bc0c004af4d0b12a275045c.jpg",
                "fileUrl": "http://s3.amazonaws.com/decora-platform-1-nv/2018/10/12/5bc0c004af4d0b12a275045c.jpg"
              },
              "tags": [
                {
                  "id": "5beaea1be0eabc0001e40e07",
                  "comment": "543",
                  "coordinates": [
                    23.77,
                    35.94,
                    39.42,
                    40.14
                  ],
                  "reference": "2"
                }
              ],
              "zoomAreas": [
                {
                  "id": "5beaea1be0eabc0001e40e0b",
                  "renderShot": {
                    "position": {
                      "x": 383.99999999999994,
                      "y": 429.5
                    },
                    "zoomScale": 2.5,
                    "file": {
                      "id": "5bc0c004af4d0b12a275045c",
                      "extension": "jpg",
                      "size": 2345177,
                      "originalName": "5bc0c01fb9d2556864012e663403495293304447304.jpg",
                      "fileBasePath": "2018/10/12/5bc0c004af4d0b12a275045c.jpg",
                      "fileUrl": "http://s3.amazonaws.com/decora-platform-1-nv/2018/10/12/5bc0c004af4d0b12a275045c.jpg"
                    },
                    "tags": [
                      {
                        "id": "5beaea1be0eabc0001e40e0c",
                        "comment": "3333",
                        "coordinates": [
                          34.64,
                          9.71,
                          40.29,
                          78.84
                        ],
                        "reference": "1"
                      },
                      {
                        "id": "5beaea1be0eabc0001e40e0d",
                        "comment": "444",
                        "coordinates": [
                          60,
                          62.9,
                          71.16,
                          72.75
                        ],
                        "reference": "2"
                      }
                    ]
                  },
                  "referenceShot": {
                    "position": {
                      "x": 262.5,
                      "y": 379
                    },
                    "zoomScale": 2.5,
                    "file": {
                      "id": "5b6d93e2e35ccc11a2ce4a62",
                      "extension": "jpg",
                      "size": 68119,
                      "originalName": "5b6d93e2e35ccc11a2ce4a611337165977782751752.jpg",
                      "fileBasePath": "2018/8/10/5b6d93e2e35ccc11a2ce4a62.jpg",
                      "fileUrl": "http://s3.amazonaws.com/decora-platform-1-nv/2018/8/10/5b6d93e2e35ccc11a2ce4a62.jpg"
                    },
                    "tags": [
                      {
                        "id": "5beaea1be0eabc0001e40e0e",
                        "coordinates": [
                          20.29,
                          6.23,
                          31.88,
                          85.51
                        ],
                        "reference": "2.1"
                      },
                      {
                        "id": "5beaea1be0eabc0001e40e0f",
                        "coordinates": [
                          55.8,
                          74.35,
                          77.25,
                          89.71
                        ],
                        "reference": "2.2"
                      }
                    ]
                  },
                  "coordinates": [
                    53,
                    61
                  ],
                  "reference": "1"
                }
              ]
            },
            {
              "file": {
                "id": "5bc0c005af4d0b12a275045d",
                "extension": "jpg",
                "size": 161084,
                "originalName": "5bc0c020b9d2556864012e677573635948583285777.jpg",
                "fileBasePath": "2018/10/12/5bc0c005af4d0b12a275045d.jpg",
                "fileUrl": "http://s3.amazonaws.com/decora-platform-1-nv/2018/10/12/5bc0c005af4d0b12a275045d.jpg"
              },
              "tags": [],
              "zoomAreas": []
            },
            {
              "file": {
                "id": "5bc0c005af4d0b12a275045e",
                "extension": "jpg",
                "size": 139832,
                "originalName": "5bc0c020b9d2556864012e683273750830296023209.jpg",
                "fileBasePath": "2018/10/12/5bc0c005af4d0b12a275045e.jpg",
                "fileUrl": "http://s3.amazonaws.com/decora-platform-1-nv/2018/10/12/5bc0c005af4d0b12a275045e.jpg"
              },
              "tags": [],
              "zoomAreas": []
            },
            {
              "file": {
                "id": "5bc0c005af4d0b12a275045f",
                "extension": "jpg",
                "size": 129008,
                "originalName": "5bc0c01fb9d2556864012e659085057121253553044.jpg",
                "fileBasePath": "2018/10/12/5bc0c005af4d0b12a275045f.jpg",
                "fileUrl": "http://s3.amazonaws.com/decora-platform-1-nv/2018/10/12/5bc0c005af4d0b12a275045f.jpg"
              },
              "tags": [],
              "zoomAreas": []
            },
            {
              "file": {
                "id": "5bc0c005af4d0b12a2750460",
                "extension": "jpg",
                "size": 235572,
                "originalName": "5bc0c022b9d2556864012e711004971715363844232.jpg",
                "fileBasePath": "2018/10/12/5bc0c005af4d0b12a2750460.jpg",
                "fileUrl": "http://s3.amazonaws.com/decora-platform-1-nv/2018/10/12/5bc0c005af4d0b12a2750460.jpg"
              },
              "tags": [],
              "zoomAreas": []
            },
            {
              "file": {
                "id": "5bc0c005af4d0b12a2750461",
                "extension": "jpg",
                "size": 308708,
                "originalName": "5bc0c022b9d2556864012e724072348360670137364.jpg",
                "fileBasePath": "2018/10/12/5bc0c005af4d0b12a2750461.jpg",
                "fileUrl": "http://s3.amazonaws.com/decora-platform-1-nv/2018/10/12/5bc0c005af4d0b12a2750461.jpg"
              },
              "tags": [],
              "zoomAreas": []
            },
            {
              "file": {
                "id": "5bc0c005af4d0b12a2750462",
                "extension": "jpg",
                "size": 287460,
                "originalName": "5bc0c023b9d2556864012e7348087006088167460.jpg",
                "fileBasePath": "2018/10/12/5bc0c005af4d0b12a2750462.jpg",
                "fileUrl": "http://s3.amazonaws.com/decora-platform-1-nv/2018/10/12/5bc0c005af4d0b12a2750462.jpg"
              },
              "tags": [],
              "zoomAreas": []
            },
            {
              "file": {
                "id": "5bc0c005af4d0b12a2750463",
                "extension": "jpg",
                "size": 208991,
                "originalName": "5bc0c021b9d2556864012e6d3944625348973255650.jpg",
                "fileBasePath": "2018/10/12/5bc0c005af4d0b12a2750463.jpg",
                "fileUrl": "http://s3.amazonaws.com/decora-platform-1-nv/2018/10/12/5bc0c005af4d0b12a2750463.jpg"
              },
              "tags": [],
              "zoomAreas": []
            },
            {
              "file": {
                "id": "5bc0c005af4d0b12a2750464",
                "extension": "jpg",
                "size": 192274,
                "originalName": "5bc0c021b9d2556864012e6e2119302647083259675.jpg",
                "fileBasePath": "2018/10/12/5bc0c005af4d0b12a2750464.jpg",
                "fileUrl": "http://s3.amazonaws.com/decora-platform-1-nv/2018/10/12/5bc0c005af4d0b12a2750464.jpg"
              },
              "tags": [],
              "zoomAreas": []
            },
            {
              "file": {
                "id": "5bc0c005af4d0b12a2750465",
                "extension": "jpg",
                "size": 227050,
                "originalName": "5bc0c022b9d2556864012e6f4285076859866605733.jpg",
                "fileBasePath": "2018/10/12/5bc0c005af4d0b12a2750465.jpg",
                "fileUrl": "http://s3.amazonaws.com/decora-platform-1-nv/2018/10/12/5bc0c005af4d0b12a2750465.jpg"
              },
              "tags": [],
              "zoomAreas": []
            },
            {
              "file": {
                "id": "5bc0c005af4d0b12a2750466",
                "extension": "jpg",
                "size": 226909,
                "originalName": "5bc0c022b9d2556864012e701912139075553755772.jpg",
                "fileBasePath": "2018/10/12/5bc0c005af4d0b12a2750466.jpg",
                "fileUrl": "http://s3.amazonaws.com/decora-platform-1-nv/2018/10/12/5bc0c005af4d0b12a2750466.jpg"
              },
              "tags": [],
              "zoomAreas": []
            },
            {
              "file": {
                "id": "5bc0c005af4d0b12a2750467",
                "extension": "jpg",
                "size": 312235,
                "originalName": "5bc0c020b9d2556864012e6a2992389032057584696.jpg",
                "fileBasePath": "2018/10/12/5bc0c005af4d0b12a2750467.jpg",
                "fileUrl": "http://s3.amazonaws.com/decora-platform-1-nv/2018/10/12/5bc0c005af4d0b12a2750467.jpg"
              },
              "tags": [],
              "zoomAreas": []
            },
            {
              "file": {
                "id": "5bc0c005af4d0b12a2750468",
                "extension": "jpg",
                "size": 128464,
                "originalName": "5bc0c021b9d2556864012e6b7244398588941940214.jpg",
                "fileBasePath": "2018/10/12/5bc0c005af4d0b12a2750468.jpg",
                "fileUrl": "http://s3.amazonaws.com/decora-platform-1-nv/2018/10/12/5bc0c005af4d0b12a2750468.jpg"
              },
              "tags": [],
              "zoomAreas": []
            },
            {
              "file": {
                "id": "5bc0c005af4d0b12a2750469",
                "extension": "jpg",
                "size": 123904,
                "originalName": "5bc0c021b9d2556864012e6c3083684842579548551.jpg",
                "fileBasePath": "2018/10/12/5bc0c005af4d0b12a2750469.jpg",
                "fileUrl": "http://s3.amazonaws.com/decora-platform-1-nv/2018/10/12/5bc0c005af4d0b12a2750469.jpg"
              },
              "tags": [],
              "zoomAreas": []
            },
            {
              "file": {
                "id": "5bc0c005af4d0b12a275046a",
                "extension": "jpg",
                "size": 118891,
                "originalName": "5bc0c020b9d2556864012e694228290824938901743.jpg",
                "fileBasePath": "2018/10/12/5bc0c005af4d0b12a275046a.jpg",
                "fileUrl": "http://s3.amazonaws.com/decora-platform-1-nv/2018/10/12/5bc0c005af4d0b12a275046a.jpg"
              },
              "tags": [],
              "zoomAreas": []
            }
          ]
        },
        "modelCubeX": 172.176,
        "modelCubeY": 43.2118,
        "modelCubeZ": 97.1993
      },
      {
        "id": "5beaea24030f612210789921",
        "number": 4,
        "status": "TIME_EXPIRED",
        "renderStatus": "WAITING",
        "start": "2018-11-13T15:13:40.244+0000",
        "end": "2018-11-14T15:13:40.244+0000",
        "qualityAssurance": {
          "qualityAgent": {},
          "reviewAgent": {},
          "renders": []
        }
      }
    ]
  }

  product = {
    "id": "206:24186619-000-000",
    "sku": "24186619-000-000",
    "name": "Silver Orchid Olivia Glam Grey 9-drawer Dresser Grey",
    "brand": "Silver Orchid",
    "kitSize": 0,
    "url": "https://www.overstock.com/Home-Garden/Silver-Orchid-Olivia-Glam-Grey-9-drawer-Dresser/21906964/product.html",
    "version": 1,
    "responsible": {
      "id": 25718,
      "name": "Gabriel Genari",
      "teamQA": "Arthur"
    },
    "company": {
      "id": 206,
      "name": "Overstock",
      "country": "USA",
      "logoImage": {
        "id": "5a04c69ee35ccc0ece99a8df",
        "extension": "png",
        "originalName": "dp_57fffe4c23358f70253706ed.png",
        "fileBasePath": "2017/11/9/5a04c69ee35ccc0ece99a8df.png",
        "fileBaseUrl": "http://s3.amazonaws.com/decora-platform-1-nv/2017/11/9/5a04c69ee35ccc0ece99a8df",
        "fileUrl": "http://s3.amazonaws.com/decora-platform-1-nv/2017/11/9/5a04c69ee35ccc0ece99a8df.png"
      }
    },
    "inputSource": "MANUAL",
    "lastUpdate": 1534268309124,
    "description": "This beautiful 9-drawer dresser is the perfect addition to any glam styled bedroom. Each part of this dresser features a lustrous grey finish and unique design elements which give it high visual appeal. Mirrored accents on the sides of the dresser elevate its overall glam look and feel while 9 spacious drawers add to its functionality. Together, they create a sophisticated bedroom aesthetic. ",
    "descriptionEnumeration": [],
    "externalJobs": [],
    "internalJobs": [],
    "colorVariationFather": false,
    "referenceCubeX": 172.7203454406909,
    "referenceCubeY": 45.720091440182884,
    "referenceCubeZ": 99.06019812039624,
    "dimensionSpecifications": {},
    "generalSpecifications": {
      "Material": "Wood"
    },
    "extraDocLinks": {},
    "decoraCategory": "122",
    "companyCategories": [
      {
        "key": "bedroomfurniture",
        "value": "Bedroom Furniture"
      },
      {
        "key": "dresserschests",
        "value": "Dressers & Chests"
      },
      {
        "key": "furniture",
        "value": "Furniture"
      },
      {
        "key": "homegoods",
        "value": "Home Goods"
      }
    ],
    "companyCategoriesHash": "bedroomfurniture:dresserschests:furniture:homegoods:",
    "tags": [
      "Silver Orchid"
    ],
    "metadata": {},
    "assets": {
      "productAssetMaxMain": false,
      "productAssetMaxStates": false,
      "productAssetPakMain": false,
      "productAssetPakStates": false,
      "productAssetSpin": false,
      "productAssetSilo": false,
      "productAssetDAE": false
    },
    "deleted": false,
    "discontinued": false,
    "referenceImages": [
      {
        "url": "https://ak1.ostkcdn.com/images/products/18017652/Best-Quality-Furniture-Glam-Grey-9-drawer-Dresser-19d5dd20-60b9-4f49-ae05-1400e067c041.jpg",
        "sysFile": {
          "id": "5b6d93e2e35ccc11a2ce4a62",
          "extension": "jpg",
          "size": 68119,
          "originalName": "5b6d93e2e35ccc11a2ce4a611337165977782751752.jpg",
          "fileBasePath": "2018/8/10/5b6d93e2e35ccc11a2ce4a62.jpg",
          "fileBaseUrl": "http://s3.amazonaws.com/decora-platform-1-nv/2018/8/10/5b6d93e2e35ccc11a2ce4a62",
          "fileUrl": "http://s3.amazonaws.com/decora-platform-1-nv/2018/8/10/5b6d93e2e35ccc11a2ce4a62.jpg"
        }
      },
      {
        "url": "https://ak1.ostkcdn.com/images/products/18017652/Best-Quality-Furniture-Glam-Grey-9-drawer-Dresser-1e6e4581-8f0c-4bf6-8d4e-fb2e7064536b.jpg",
        "sysFile": {
          "id": "5b6d93e3e35ccc11a2ce4a64",
          "extension": "jpg",
          "size": 99710,
          "originalName": "5b6d93e3e35ccc11a2ce4a63834434166039237472.jpg",
          "fileBasePath": "2018/8/10/5b6d93e3e35ccc11a2ce4a64.jpg",
          "fileBaseUrl": "http://s3.amazonaws.com/decora-platform-1-nv/2018/8/10/5b6d93e3e35ccc11a2ce4a64",
          "fileUrl": "http://s3.amazonaws.com/decora-platform-1-nv/2018/8/10/5b6d93e3e35ccc11a2ce4a64.jpg"
        }
      }
    ],
    "renderedImages": [],
    "decora": false,
    "isKit": false,
    "isModelApproved": false
  }

  constructor() { }

  ngOnInit() {
  }

}
