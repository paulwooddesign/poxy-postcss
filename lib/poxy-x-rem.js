var newBlock = require('./new-block.js');

module.exports = function poxyXRemDecl(css, settings) {
  css.walkDecls('poxy-x-rem', function(decl) {
    var declArr = [],
        poxyColumn,
        copy_width,
        gutter_x,
        poxyColumnCycle,
        poxyColumnGutter = settings.gutter,
        poxyColumnFlexbox = settings.flexbox;

    if (settings.cycle === 'auto') {
      poxyColumnCycle = decl.value.split('/')[1];
    } else {
      poxyColumnCycle = settings.cycle;
    }

    declArr = decl.value.split(' ');
    poxyColumn = declArr[0];

    if (declArr[1] !== undefined && declArr[1].search(/^\d/) !== -1) {
      copy_width = declArr[1];
    }

    if (declArr[1] == 'flex' || declArr[1] == 'no-flex' || declArr[1] == 'auto') {
      poxyColumnCycle = declArr[0].split('/')[1];
    }

    if (declArr[2] !== undefined && declArr[2].search(/^\d/) !== -1) {
      gutter_x = declArr[2];
    }

    if (declArr.indexOf('flex') !== -1) {
      poxyColumnFlexbox = 'flex';
    }

    if (declArr.indexOf('no-flex') !== -1) {
      poxyColumnFlexbox = 'no-flex';
    }

    decl.parent.nodes.forEach(function (decl) {
      if (decl.prop == 'poxy-column-cycle') {
        poxyColumnCycle = decl.value;

        decl.remove();
      }
    });

    decl.parent.nodes.forEach(function (decl) {
      if (decl.prop == 'poxy-column-gutter') {
        poxyColumnGutter = decl.value;

        decl.remove();
      }
    });

    decl.parent.nodes.forEach(function (decl) {
      if (decl.prop == 'poxy-column-flexbox') {
        if (decl.prop == 'flex') {
          poxyColumnFlexbox = 'flex';
        }

        decl.remove();
      }
    });

    decl.cloneBefore({
      prop: 'width',
      value: 'calc('+ copy_width +' * '+ poxyColumn +' - ('+ gutter_x +'rem - '+ gutter_x +'rem * '+ poxyColumn +'))'
    });

    decl.remove();
  });
};
