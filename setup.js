const tinycolor = require('tinycolor2');

module.exports = theo => {
  theo.registerFormat('ios.color.swift', result => {
    const colors = result
      .get('props')
      .map(prop => {
        const { r, g, b, a } = tinycolor(prop.get('value')).toRgb();
        return `  @objc static let ${prop.get('name')} = #colorLiteral(red: ${parseFloat(r)/255.0}, green: ${parseFloat(g)/255.0}, blue: ${parseFloat(b)/255.0}, alpha: ${parseFloat(a)})`;
      });
    return [
      'import UIKit',
      '',
      'extension UIColor {',
      ...colors,
      '}'
    ].join('\n');
  });
}