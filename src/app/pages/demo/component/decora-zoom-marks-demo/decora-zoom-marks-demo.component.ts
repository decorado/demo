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
    tags: [
      {
        comment: '1163',
        reference: '1',
        feedback: '',
        status: '',
        coordinates: [2, 56],
        version: 21
      },
      {
        comment: '2K5',
        reference: '2',
        feedback: '',
        status: '',
        coordinates: [8, 40, 53, 32],
        version: 21
      },
      {
        comment: '73',
        reference: '3',
        feedback: '',
        status: '',
        coordinates: [54, 40],
        version: 23
      },
      {
        comment: '2C3',
        reference: '4',
        feedback: '',
        status: '',
        coordinates: [12, 67, 32, 45],
        version: 23
      }
    ]
  };

  markedObjs: any[];

  feedbackObjs: any[];

  marker: any;

  qaMode: boolean;

  constructor() {

    this.feedbackObjs = [
      // tslint:disable-next-line:max-line-length
      { 'file': { 'id': '5bb50b1faf4d0b12a262c769', 'extension': 'jpg', 'size': 3014539, 'originalName': '5bb50b4849d9bc07297662d08381318465016007945.jpg', 'fileBasePath': '2018/10/3/5bb50b1faf4d0b12a262c769.jpg', 'fileUrl': 'http://s3.amazonaws.com/decora-platform-1-nv/2018/10/3/5bb50b1faf4d0b12a262c769.jpg' }, 'tags': [{ 'id': '5be4a2c28b87bc0001bca382', 'comment': '321', 'coordinates': [32.47, 85.63, 53.45, 88.51], 'reference': '1' }, { 'id': '5be4a2c28b87bc0001bca383', 'comment': '2111', 'coordinates': [32.47, 10.2, 44.25, 18.1], 'reference': '5' }, { 'id': '5be4a32e8b87bc0001bca38f', 'comment': '3324', 'status': 'LASTCHECK_NEW', 'coordinates': [69.11, 13.65, 80.17, 18.82], 'reference': '6' }, { 'id': '5be4a32e8b87bc0001bca390', 'comment': '321', 'status': 'LASTCHECK_NEW', 'coordinates': [25.43, 37.5], 'reference': '7' }, { 'id': '5be4a2c28b87bc0001bca381', 'comment': '100', 'status': 'LASTCHECK_DELETED', 'coordinates': [27.01, 36.49] }], 'zoomAreas': [{ 'id': '5be4a2c28b87bc0001bca384', 'note': 'Testando', 'renderShot': { 'position': { 'x': 380.1939655172414, 'y': 251.99999999999997 }, 'zoomScale': 3.0, 'file': { 'id': '5bb50b1faf4d0b12a262c769', 'extension': 'jpg', 'size': 3014539, 'originalName': '5bb50b4849d9bc07297662d08381318465016007945.jpg', 'fileBasePath': '2018/10/3/5bb50b1faf4d0b12a262c769.jpg', 'fileUrl': 'http://s3.amazonaws.com/decora-platform-1-nv/2018/10/3/5bb50b1faf4d0b12a262c769.jpg' }, 'tags': [{ 'id': '5be4a2c28b87bc0001bca385', 'comment': '01', 'coordinates': [38.99, 32.9, 63.91, 48.99], 'reference': '1' }, { 'id': '5be4a32e8b87bc0001bca391', 'comment': '531', 'status': 'LASTCHECK_NEW', 'coordinates': [32.75, 60.72], 'reference': '2' }, { 'id': '5be4a2c28b87bc0001bca386', 'comment': '4211', 'status': 'LASTCHECK_DELETED', 'coordinates': [13.33, 48.7] }] }, 'referenceShot': { 'position': { 'x': 306.0883620689655, 'y': 251.0 }, 'zoomScale': 5.0, 'file': { 'id': '5b9fba10e35ccc20da6ff94a', 'extension': 'jpg', 'size': 29650, 'originalName': '5b9fba10e35ccc20da6ff9494169173004648454915.jpg', 'fileBasePath': '2018/9/17/5b9fba10e35ccc20da6ff94a.jpg', 'fileUrl': 'http://s3.amazonaws.com/decora-platform-1-nv/2018/9/17/5b9fba10e35ccc20da6ff94a.jpg' }, 'tags': [{ 'id': '5be4a2c28b87bc0001bca387', 'coordinates': [32.46, 41.45], 'reference': '1.2' }] }, 'status': 'LASTCHECK_UPDATED', 'coordinates': [53.0, 41.0], 'reference': '3' }, { 'id': '5be4a2c28b87bc0001bca388', 'note': 'asasdasd', 'renderShot': { 'position': { 'x': 470.3477011494253, 'y': 156.0 }, 'zoomScale': 4.0, 'file': { 'id': '5bb50b1faf4d0b12a262c769', 'extension': 'jpg', 'size': 3014539, 'originalName': '5bb50b4849d9bc07297662d08381318465016007945.jpg', 'fileBasePath': '2018/10/3/5bb50b1faf4d0b12a262c769.jpg', 'fileUrl': 'http://s3.amazonaws.com/decora-platform-1-nv/2018/10/3/5bb50b1faf4d0b12a262c769.jpg' }, 'tags': [{ 'id': '5be4a32e8b87bc0001bca392', 'comment': '321', 'status': 'LASTCHECK_NEW', 'coordinates': [40.58, 36.81, 68.26, 56.67], 'reference': '1' }, { 'id': '5be4a2c28b87bc0001bca389', 'comment': '01', 'status': 'LASTCHECK_DELETED', 'coordinates': [65.94, 29.13, 80.58, 36.52] }, { 'id': '5be4a2c28b87bc0001bca38a', 'comment': '244', 'status': 'LASTCHECK_DELETED', 'coordinates': [56.81, 66.38] }] }, 'referenceShot': { 'position': { 'x': 449.9181034482759, 'y': 187.5 }, 'zoomScale': 3.0, 'file': { 'id': '5b9fba10e35ccc20da6ff94a', 'extension': 'jpg', 'size': 29650, 'originalName': '5b9fba10e35ccc20da6ff9494169173004648454915.jpg', 'fileBasePath': '2018/9/17/5b9fba10e35ccc20da6ff94a.jpg', 'fileUrl': 'http://s3.amazonaws.com/decora-platform-1-nv/2018/9/17/5b9fba10e35ccc20da6ff94a.jpg' }, 'tags': [] }, 'status': 'LASTCHECK_UPDATED', 'coordinates': [68.0, 28.0], 'reference': '4' }, { 'id': '5be4a2c28b87bc0001bca38b', 'note': 'gfdsgfdsgfd', 'renderShot': { 'position': { 'x': 373.3534482758621, 'y': 157.4 }, 'zoomScale': 6.0, 'file': { 'id': '5bb50b1faf4d0b12a262c769', 'extension': 'jpg', 'size': 3014539, 'originalName': '5bb50b4849d9bc07297662d08381318465016007945.jpg', 'fileBasePath': '2018/10/3/5bb50b1faf4d0b12a262c769.jpg', 'fileUrl': 'http://s3.amazonaws.com/decora-platform-1-nv/2018/10/3/5bb50b1faf4d0b12a262c769.jpg' }, 'tags': [{ 'id': '5be4a2c28b87bc0001bca38c', 'comment': '3022', 'coordinates': [22.03, 20.14, 44.78, 31.01], 'reference': '1' }] }, 'referenceShot': { 'position': { 'x': 350.4525862068965, 'y': 188.75 }, 'zoomScale': 5.0, 'file': { 'id': '5b9fba10e35ccc20da6ff94a', 'extension': 'jpg', 'size': 29650, 'originalName': '5b9fba10e35ccc20da6ff9494169173004648454915.jpg', 'fileBasePath': '2018/9/17/5b9fba10e35ccc20da6ff94a.jpg', 'fileUrl': 'http://s3.amazonaws.com/decora-platform-1-nv/2018/9/17/5b9fba10e35ccc20da6ff94a.jpg' }, 'tags': [] }, 'coordinates': [53.0, 27.0], 'reference': '5' }] }, { 'file': { 'id': '5bb50b1faf4d0b12a262c76a', 'extension': 'jpg', 'size': 1683347, 'originalName': '5bb50b4449d9bc07297662c86725060624724386926.jpg', 'fileBasePath': '2018/10/3/5bb50b1faf4d0b12a262c76a.jpg', 'fileUrl': 'http://s3.amazonaws.com/decora-platform-1-nv/2018/10/3/5bb50b1faf4d0b12a262c76a.jpg' }, 'tags': [], 'zoomAreas': [] }, { 'file': { 'id': '5bb50b1faf4d0b12a262c76b', 'extension': 'jpg', 'size': 102687, 'originalName': '5bb50b4749d9bc07297662ce8097357289253614525.jpg', 'fileBasePath': '2018/10/3/5bb50b1faf4d0b12a262c76b.jpg', 'fileUrl': 'http://s3.amazonaws.com/decora-platform-1-nv/2018/10/3/5bb50b1faf4d0b12a262c76b.jpg' }, 'tags': [], 'zoomAreas': [] }, { 'file': { 'id': '5bb50b1faf4d0b12a262c76c', 'extension': 'jpg', 'size': 110948, 'originalName': '5bb50b4749d9bc07297662cf9076579821085050363.jpg', 'fileBasePath': '2018/10/3/5bb50b1faf4d0b12a262c76c.jpg', 'fileUrl': 'http://s3.amazonaws.com/decora-platform-1-nv/2018/10/3/5bb50b1faf4d0b12a262c76c.jpg' }, 'tags': [], 'zoomAreas': [] }, { 'file': { 'id': '5bb50b20af4d0b12a262c76d', 'extension': 'jpg', 'size': 114822, 'originalName': '5bb50b4249d9bc07297662c45115065101466916541.jpg', 'fileBasePath': '2018/10/3/5bb50b20af4d0b12a262c76d.jpg', 'fileUrl': 'http://s3.amazonaws.com/decora-platform-1-nv/2018/10/3/5bb50b20af4d0b12a262c76d.jpg' }, 'tags': [], 'zoomAreas': [] }, { 'file': { 'id': '5bb50b20af4d0b12a262c76e', 'extension': 'jpg', 'size': 234005, 'originalName': '5bb50b4349d9bc07297662c62753331738130589516.jpg', 'fileBasePath': '2018/10/3/5bb50b20af4d0b12a262c76e.jpg', 'fileUrl': 'http://s3.amazonaws.com/decora-platform-1-nv/2018/10/3/5bb50b20af4d0b12a262c76e.jpg' }, 'tags': [], 'zoomAreas': [] }, { 'file': { 'id': '5bb50b20af4d0b12a262c76f', 'extension': 'jpg', 'size': 227703, 'originalName': '5bb50b4249d9bc07297662c5147743298390869605.jpg', 'fileBasePath': '2018/10/3/5bb50b20af4d0b12a262c76f.jpg', 'fileUrl': 'http://s3.amazonaws.com/decora-platform-1-nv/2018/10/3/5bb50b20af4d0b12a262c76f.jpg' }, 'tags': [], 'zoomAreas': [] }, { 'file': { 'id': '5bb50b20af4d0b12a262c770', 'extension': 'jpg', 'size': 231543, 'originalName': '5bb50b4649d9bc07297662cd6782190777450327043.jpg', 'fileBasePath': '2018/10/3/5bb50b20af4d0b12a262c770.jpg', 'fileUrl': 'http://s3.amazonaws.com/decora-platform-1-nv/2018/10/3/5bb50b20af4d0b12a262c770.jpg' }, 'tags': [], 'zoomAreas': [] }, { 'file': { 'id': '5bb50b20af4d0b12a262c771', 'extension': 'jpg', 'size': 237753, 'originalName': '5bb50b4649d9bc07297662cc4320297307380172185.jpg', 'fileBasePath': '2018/10/3/5bb50b20af4d0b12a262c771.jpg', 'fileUrl': 'http://s3.amazonaws.com/decora-platform-1-nv/2018/10/3/5bb50b20af4d0b12a262c771.jpg' }, 'tags': [], 'zoomAreas': [] }, { 'file': { 'id': '5bb50b20af4d0b12a262c772', 'extension': 'jpg', 'size': 241880, 'originalName': '5bb50b4649d9bc07297662cb3845574692272309883.jpg', 'fileBasePath': '2018/10/3/5bb50b20af4d0b12a262c772.jpg', 'fileUrl': 'http://s3.amazonaws.com/decora-platform-1-nv/2018/10/3/5bb50b20af4d0b12a262c772.jpg' }, 'tags': [], 'zoomAreas': [] }, { 'file': { 'id': '5bb50b20af4d0b12a262c773', 'extension': 'jpg', 'size': 203384, 'originalName': '5bb50b4549d9bc07297662ca638919075572155425.jpg', 'fileBasePath': '2018/10/3/5bb50b20af4d0b12a262c773.jpg', 'fileUrl': 'http://s3.amazonaws.com/decora-platform-1-nv/2018/10/3/5bb50b20af4d0b12a262c773.jpg' }, 'tags': [], 'zoomAreas': [] }, { 'file': { 'id': '5bb50b20af4d0b12a262c774', 'extension': 'jpg', 'size': 202128, 'originalName': '5bb50b4549d9bc07297662c93066244813172045416.jpg', 'fileBasePath': '2018/10/3/5bb50b20af4d0b12a262c774.jpg', 'fileUrl': 'http://s3.amazonaws.com/decora-platform-1-nv/2018/10/3/5bb50b20af4d0b12a262c774.jpg' }, 'tags': [], 'zoomAreas': [] }, { 'file': { 'id': '5bb50b20af4d0b12a262c775', 'extension': 'jpg', 'size': 202892, 'originalName': '5bb50b4349d9bc07297662c78860286763005821322.jpg', 'fileBasePath': '2018/10/3/5bb50b20af4d0b12a262c775.jpg', 'fileUrl': 'http://s3.amazonaws.com/decora-platform-1-nv/2018/10/3/5bb50b20af4d0b12a262c775.jpg' }, 'tags': [], 'zoomAreas': [] }, { 'file': { 'id': '5bb50b20af4d0b12a262c776', 'extension': 'jpg', 'size': 123623, 'originalName': '5bb50b4b49d9bc07297662d33907226417731716370.jpg', 'fileBasePath': '2018/10/3/5bb50b20af4d0b12a262c776.jpg', 'fileUrl': 'http://s3.amazonaws.com/decora-platform-1-nv/2018/10/3/5bb50b20af4d0b12a262c776.jpg' }, 'tags': [], 'zoomAreas': [] }, { 'file': { 'id': '5bb50b20af4d0b12a262c777', 'extension': 'jpg', 'size': 132806, 'originalName': '5bb50b4a49d9bc07297662d2495574954817733295.jpg', 'fileBasePath': '2018/10/3/5bb50b20af4d0b12a262c777.jpg', 'fileUrl': 'http://s3.amazonaws.com/decora-platform-1-nv/2018/10/3/5bb50b20af4d0b12a262c777.jpg' }, 'tags': [], 'zoomAreas': [] }, { 'file': { 'id': '5bb50b20af4d0b12a262c778', 'extension': 'jpg', 'size': 139687, 'originalName': '5bb50b4a49d9bc07297662d14418608106215873513.jpg', 'fileBasePath': '2018/10/3/5bb50b20af4d0b12a262c778.jpg', 'fileUrl': 'http://s3.amazonaws.com/decora-platform-1-nv/2018/10/3/5bb50b20af4d0b12a262c778.jpg' }, 'tags': [], 'zoomAreas': [] }
    ];

    this.markedObjs = [
      // tslint:disable-next-line:max-line-length
      { 'file': { 'id': '5bf2218faf4d0b12a287b8cd', 'extension': 'jpg', 'size': 3522060, 'originalName': '5bf221a249d9bc6089fb1c451253213874519205737.jpg', 'fileBasePath': '2018/11/19/5bf2218faf4d0b12a287b8cd.jpg', 'fileUrl': 'http://s3.amazonaws.com/decora-platform-1-nv/2018/11/19/5bf2218faf4d0b12a287b8cd.jpg' } }, { 'file': { 'id': '5bf22190af4d0b12a287b8ce', 'extension': 'jpg', 'size': 329711, 'originalName': '5bf221a149d9bc6089fb1c4067518518132790216.jpg', 'fileBasePath': '2018/11/19/5bf22190af4d0b12a287b8ce.jpg', 'fileUrl': 'http://s3.amazonaws.com/decora-platform-1-nv/2018/11/19/5bf22190af4d0b12a287b8ce.jpg' } }, { 'file': { 'id': '5bf22190af4d0b12a287b8cf', 'extension': 'jpg', 'size': 241032, 'originalName': '5bf221a149d9bc6089fb1c3f4535945364430040318.jpg', 'fileBasePath': '2018/11/19/5bf22190af4d0b12a287b8cf.jpg', 'fileUrl': 'http://s3.amazonaws.com/decora-platform-1-nv/2018/11/19/5bf22190af4d0b12a287b8cf.jpg' } }, { 'file': { 'id': '5bf22190af4d0b12a287b8d0', 'extension': 'jpg', 'size': 499342, 'originalName': '5bf221a249d9bc6089fb1c447463861286152943628.jpg', 'fileBasePath': '2018/11/19/5bf22190af4d0b12a287b8d0.jpg', 'fileUrl': 'http://s3.amazonaws.com/decora-platform-1-nv/2018/11/19/5bf22190af4d0b12a287b8d0.jpg' } }, { 'file': { 'id': '5bf22190af4d0b12a287b8d1', 'extension': 'jpg', 'size': 499225, 'originalName': '5bf221a249d9bc6089fb1c437479196192508836329.jpg', 'fileBasePath': '2018/11/19/5bf22190af4d0b12a287b8d1.jpg', 'fileUrl': 'http://s3.amazonaws.com/decora-platform-1-nv/2018/11/19/5bf22190af4d0b12a287b8d1.jpg' } }, { 'file': { 'id': '5bf22190af4d0b12a287b8d2', 'extension': 'jpg', 'size': 499650, 'originalName': '5bf221a149d9bc6089fb1c429040357991095023823.jpg', 'fileBasePath': '2018/11/19/5bf22190af4d0b12a287b8d2.jpg', 'fileUrl': 'http://s3.amazonaws.com/decora-platform-1-nv/2018/11/19/5bf22190af4d0b12a287b8d2.jpg' } }, { 'file': { 'id': '5bf22190af4d0b12a287b8d3', 'extension': 'jpg', 'size': 87010, 'originalName': '5bf221a149d9bc6089fb1c414789733215432512372.jpg', 'fileBasePath': '2018/11/19/5bf22190af4d0b12a287b8d3.jpg', 'fileUrl': 'http://s3.amazonaws.com/decora-platform-1-nv/2018/11/19/5bf22190af4d0b12a287b8d3.jpg' } }
    ];

  }

  ngOnInit() { }

}
