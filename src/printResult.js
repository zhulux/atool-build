
export default function printResult(_stats) {
  const stats = _stats.toJson();

  if (stats.errors && stats.errors.length) {
    let hasChildError = false;
    stats.children.forEach(item => {
      if (item.errors) {
        hasChildError = true;
        item.errors.forEach(err => {
          console.error('error', err);
        });
      }
    });
    if (!hasChildError) {
      stats.errors.forEach(err => {
        console.error('error', err);
      });
    }
    console.log();
  }
}
