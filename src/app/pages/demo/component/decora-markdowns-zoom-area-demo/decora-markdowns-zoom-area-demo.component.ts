import { Component } from '@angular/core';

@Component({
  selector: 'app-decora-markdowns-zoom-area-demo',
  templateUrl: './decora-markdowns-zoom-area-demo.component.html',
  styleUrls: ['./decora-markdowns-zoom-area-demo.component.scss']
})
export class DecoraMarkdownsZoomAreaDemoComponent {


  zoomAreas = [
    {
      'coordinates': [],
      'id': 5,
      'renderShot': {
        'position': {
          'x': 205.23,
          'y': 205.45
        },
        'scale': 1.5,
        'file': {
          'id': '5af21109d42cb34adaad2c8f',
          'extension': 'jpg',
          'originalName': '5a228be8eaa4256953f8afa63410780853607066604.jpg',
          'fileBasePath': '2018/5/8/5af21109d42cb34adaad2c8f.jpg',
          'fileBaseUrl': 'https://s3.amazonaws.com/decora-platform-1-nv/2018/5/8/5af21109d42cb34adaad2c8f.jpg',
          'fileUrl': 'https://s3.amazonaws.com/decora-platform-1-nv/2018/5/8/5af21109d42cb34adaad2c8f.jpg'
        },
        'comments': [
          {
            'coordinates': [
              40.28,
              39.9,
              61.24,
              57.7
            ],
            'comment': '434',
            'id': 1,
            'description': 'O material deve estar mais parecido com Alumínio. Use o estúdio DecoraTools para renderizar ou o seu resultado vai acabar ficando diferente!'
          },
          {
            'coordinates': [
              76.77,
              62.75,
              89.39,
              76.39
            ],
            'comment': '213',
            'id': 2,
            'description': 'Diminua as bordas dessa parte do objeto.'
          },
          {
            'coordinates': [
              21.97,
              17.05,
              39.9,
              27.27
            ],
            'comment': '1132',
            'id': 3,
            'description': 'Aumente consideravelmente o comprimento deste elemento conforme produto referência.'
          },
          {
            'coordinates': [
              69.82,
              17.55
            ],
            'comment': '213',
            'id': 4,
            'description': 'Diminua as bordas dessa parte do objeto.'
          }
        ]
      },
      'referenceShot': {
        'position': {
          'x': 205.23,
          'y': 205.45
        },
        'scale': 1.5,
        'file': {
          'id': '5af21109d42cb34adaad2c8f',
          'extension': 'jpg',
          'originalName': '5a228be8eaa4256953f8afa63410780853607066604.jpg',
          'fileBasePath': '2018/5/8/5af21109d42cb34adaad2c8f.jpg',
          'fileBaseUrl': 'https://s3.amazonaws.com/decora-platform-1-nv/2018/5/8/5af21109d42cb34adaad2c8f.jpg',
          'fileUrl': 'https://s3.amazonaws.com/decora-platform-1-nv/2018/5/8/5af21109d42cb34adaad2c8f.jpg'
        },
        'comments': [
          {
            'coordinates': [
              11.13,
              14.12,
              44.25,
              29.13
            ],
            'id': '5.3',
            'description': ''
          }
        ]
      }
    }
  ];
}
