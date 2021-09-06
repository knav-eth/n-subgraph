import { NProject, Transfer } from "../generated/NProject/NProject"
import { N } from "../generated/schema"

export function handleTransfer(event: Transfer): void {
  let tokenId = event.params.tokenId
  let n = N.load(tokenId.toString())

  if (n == null) {
    n = new N(tokenId.toString())

    let contract = NProject.bind(event.address)
    n.name = "N #" + tokenId.toString()

    n.first = contract.getFirst(tokenId).toI32()
    n.second = contract.getSecond(tokenId).toI32()
    n.third = contract.getThird(tokenId).toI32()
    n.fourth = contract.getFourth(tokenId).toI32()
    n.fifth = contract.getFifth(tokenId).toI32()
    n.sixth = contract.getSixth(tokenId).toI32()
    n.seventh = contract.getSeventh(tokenId).toI32()
    n.eighth = contract.getEight(tokenId).toI32()
    n.metadataURI = contract.tokenURI(tokenId)

    let numbers: Array<i32> = [
      n.first,
      n.second,
      n.third,
      n.fourth,
      n.fifth,
      n.sixth,
      n.seventh,
      n.eighth,
    ]

    n.numbers = numbers
  }

  n.owner = event.params.to
  n.save()
}
