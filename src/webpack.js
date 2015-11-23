import webpack from 'webpack';
import ProgressPlugin from 'webpack/lib/ProgressPlugin';

webpack.ProgressPlugin = ProgressPlugin;
export default webpack;
