import {
  adjectives,
  animals,
  names,
  uniqueNamesGenerator,
} from "unique-names-generator";

export function humanizedName() {
  return uniqueNamesGenerator({
    dictionaries: [names, adjectives, animals],
    separator: "-",
    style: "lowerCase",
  });
}
