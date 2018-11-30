import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-decora-card-similar-product',
  templateUrl: './decora-card-similar-product.component.html',
  styleUrls: ['./decora-card-similar-product.component.scss']
})
export class DecoraCardSimilarProductComponent implements OnInit {

  public products = [
    {
      'id': '203:89832771',
      'sku': '89832771',
      'name': 'Futon Pallet Jardim Poliéster Azul 120x80cm',
      'image': {
        'id': '5bd38818e35ccc2b1b742ab3',
        'extension': 'jpg',
        'size': 126230,
        'originalName': '5bd38818e35ccc2b1b742ab2686902222984434967.jpg',
        'fileBasePath': '2018/10/26/5bd38818e35ccc2b1b742ab3.jpg',
        'fileUrl': 'http://s3.amazonaws.com/decora-platform-1-nv/2018/10/26/5bd38818e35ccc2b1b742ab3.jpg',
        'fileBaseUrl': 'http://s3.amazonaws.com/decora-platform-1-nv/2018/10/26/5bd38818e35ccc2b1b742ab3'
      }
    },
    {
      'id': '203:89575696',
      'sku': '89575696',
      'name': 'Futon Pallet Jardim Poliéster Amarela 120x80cm',
      'image': {
        'id': '5bd3881be35ccc2b1b742acd',
        'extension': 'jpg',
        'size': 133312,
        'originalName': '5bd3881be35ccc2b1b742acc4746601626720923810.jpg',
        'fileBasePath': '2018/10/26/5bd3881be35ccc2b1b742acd.jpg',
        'fileUrl': 'http://s3.amazonaws.com/decora-platform-1-nv/2018/10/26/5bd3881be35ccc2b1b742acd.jpg',
        'fileBaseUrl': 'http://s3.amazonaws.com/decora-platform-1-nv/2018/10/26/5bd3881be35ccc2b1b742acd'
      }
    },
    {
      'id': '203:89575850',
      'sku': '89575850',
      'name': 'Futon Pallet Jardim Poliéster Verde 120x80cm',
      'image': {
        'id': '5bd3881be35ccc2b1b742ad0',
        'extension': 'jpg',
        'size': 138040,
        'originalName': '5bd3881be35ccc2b1b742acf3859739414314586040.jpg',
        'fileBasePath': '2018/10/26/5bd3881be35ccc2b1b742ad0.jpg',
        'fileUrl': 'http://s3.amazonaws.com/decora-platform-1-nv/2018/10/26/5bd3881be35ccc2b1b742ad0.jpg',
        'fileBaseUrl': 'http://s3.amazonaws.com/decora-platform-1-nv/2018/10/26/5bd3881be35ccc2b1b742ad0'
      }
    },
    {
      'id': '203:89832764',
      'sku': '89832764',
      'name': 'Futon Pallet Jardim Poliéster Cinza 120x80cm',
      'image': {
        'id': '5bd3881ce35ccc2b1b742adb',
        'extension': 'jpg',
        'size': 138693,
        'originalName': '5bd3881ce35ccc2b1b742ada5954109038362172127.jpg',
        'fileBasePath': '2018/10/26/5bd3881ce35ccc2b1b742adb.jpg',
        'fileUrl': 'http://s3.amazonaws.com/decora-platform-1-nv/2018/10/26/5bd3881ce35ccc2b1b742adb.jpg',
        'fileBaseUrl': 'http://s3.amazonaws.com/decora-platform-1-nv/2018/10/26/5bd3881ce35ccc2b1b742adb'
      },
      'max': 'http://s3.amazonaws.com/decora-platform-1-nv/2018/11/28/5bfec4f3d660e0058603942c.zip'
    },
    {
      'id': '203:89575864',
      'sku': '89575864',
      'name': 'Futon Pallet Jardim Poliéster Marrom 120x80cm',
      'image': {
        'id': '5bd3881de35ccc2b1b742ae3',
        'extension': 'jpg',
        'size': 139479,
        'originalName': '5bd3881de35ccc2b1b742ae29081791904518181420.jpg',
        'fileBasePath': '2018/10/26/5bd3881de35ccc2b1b742ae3.jpg',
        'fileUrl': 'http://s3.amazonaws.com/decora-platform-1-nv/2018/10/26/5bd3881de35ccc2b1b742ae3.jpg',
        'fileBaseUrl': 'http://s3.amazonaws.com/decora-platform-1-nv/2018/10/26/5bd3881de35ccc2b1b742ae3'
      }
    },
    {
      'id': '203:89575871',
      'sku': '89575871',
      'name': 'Futon Pallet Jardim Poliéster Azul 120x80cm',
      'image': {
        'id': '5bd38822e35ccc2b1b742b05',
        'extension': 'jpg',
        'size': 134311,
        'originalName': '5bd38822e35ccc2b1b742b046527230368153967162.jpg',
        'fileBasePath': '2018/10/26/5bd38822e35ccc2b1b742b05.jpg',
        'fileUrl': 'http://s3.amazonaws.com/decora-platform-1-nv/2018/10/26/5bd38822e35ccc2b1b742b05.jpg',
        'fileBaseUrl': 'http://s3.amazonaws.com/decora-platform-1-nv/2018/10/26/5bd38822e35ccc2b1b742b05'
      }
    },
    {
      'id': '203:89575892',
      'sku': '89575892',
      'name': 'Futon Pallet Jardim Poliéster Verde Greenery 120x80cm',
      'image': {
        'id': '5bd38826e35ccc2b1b742b39',
        'extension': 'jpg',
        'size': 130062,
        'originalName': '5bd38826e35ccc2b1b742b383092329372590831594.jpg',
        'fileBasePath': '2018/10/26/5bd38826e35ccc2b1b742b39.jpg',
        'fileUrl': 'http://s3.amazonaws.com/decora-platform-1-nv/2018/10/26/5bd38826e35ccc2b1b742b39.jpg',
        'fileBaseUrl': 'http://s3.amazonaws.com/decora-platform-1-nv/2018/10/26/5bd38826e35ccc2b1b742b39'
      }
    },
    {
      'id': '203:89575885',
      'sku': '89575885',
      'name': 'Futon Pallet Jardim Poliéster Taupe 120x80cm',
      'image': {
        'id': '5bd38828e35ccc2b1b742b5e',
        'extension': 'jpg',
        'size': 137583,
        'originalName': '5bd38828e35ccc2b1b742b5d2240380924731580282.jpg',
        'fileBasePath': '2018/10/26/5bd38828e35ccc2b1b742b5e.jpg',
        'fileUrl': 'http://s3.amazonaws.com/decora-platform-1-nv/2018/10/26/5bd38828e35ccc2b1b742b5e.jpg',
        'fileBaseUrl': 'http://s3.amazonaws.com/decora-platform-1-nv/2018/10/26/5bd38828e35ccc2b1b742b5e'
      }
    }
  ]

  constructor() { }

  ngOnInit() {
  }

}
