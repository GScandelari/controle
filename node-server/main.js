function writeFile() {
    fs.writeFile('../data.txt', 'Guilherme testeeeee', err => {
        console.log('ESCREVEUUUU :: ', err);
    });
}

writeFile();