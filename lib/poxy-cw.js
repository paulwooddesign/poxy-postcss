var newBlock = require('./new-block.js');

/**
 * poxy-center: Horizontally center a container element and apply padding
 * to it.
 *
 * @param {length} [max-width] - A max-width to assign. Can be any unit.
 *
 * @param {length} [padding] - Padding on the left and right of the element.
 *   Can be any unit.
 *
 * @param {string} [flex|no-flex] - Determines whether this element should
 *   use Flexbox or not.
 *
 * @example
 *   section {
 *     poxy-center: 980px;
 *   }
 *
 * @example
 *   section {
 *     poxy-center: 1140px 30px flex;
 *   }
 */
module.exports = function poxyCopyWidthDecl(css, settings) {
  css.walkDecls('poxy-center', function(decl) {
    var declArr = [],
        poxyCenterPadding,
        poxyCenterFlexbox = settings.flexbox;

    declArr = decl.value.split(' ');

    if (declArr[1] !== undefined && declArr[1].search(/^\d/) !== -1) {
      poxyCenterPadding = declArr[1];
    }

    if (declArr.indexOf('flex') !== -1) {
      poxyCenterFlexbox = 'flex';
    }

    if (declArr.indexOf('no-flex') !== -1) {
      poxyCenterFlexbox = 'no-flex';
    }

    decl.parent.nodes.forEach(function (decl) {
      if (decl.prop == 'poxy-center-padding') {
        poxyCenterPadding = decl.value;

        decl.remove();
      }
    });

    decl.parent.nodes.forEach(function (decl) {
      if (decl.prop == 'poxy-center-flexbox') {
        if (decl.value == 'flex') {
          poxyCenterFlexbox = decl.value;
        }

        decl.remove();
      }
    });

    if (poxyCenterFlexbox === 'no-flex') {
      decl.cloneBefore({
        prop: '*zoom',
        value: '1'
      });

      newBlock(
        decl,
        ':after',
        ['content', 'display', 'clear'],
        ['\'\'', 'table', 'both']
      );

      newBlock(
        decl,
        ':before',
        ['content', 'display'],
        ['\'\'', 'table']
      );
    } else {
      decl.cloneBefore({
        prop: 'display',
        value: 'flex'
      });

      decl.cloneBefore({
        prop: 'flex-flow',
        value: 'row wrap'
      });
    }

    decl.cloneBefore({
      prop: 'max-width',
      value: declArr[0]
    });

    decl.cloneBefore({
      prop: 'margin-left',
      value: 'auto'
    });

    decl.cloneBefore({
      prop: 'margin-right',
      value: 'auto'
    });

    if (poxyCenterPadding !== undefined) {
      decl.cloneBefore({
        prop: 'padding-left',
        value: poxyCenterPadding
      });

      decl.cloneBefore({
        prop: 'padding-right',
        value: poxyCenterPadding
      });
    }

    decl.remove();
  });
};
