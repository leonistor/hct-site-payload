import demo_prods from 'import_data/demo/demo.prods.json'

async function main() {
  console.log('Checking count product photos')

  const img_count = demo_prods.reduce((acc, p) => acc + p.img_count, 0)

  console.log(`Image count: ${img_count}`)
}

main().catch(console.error)
