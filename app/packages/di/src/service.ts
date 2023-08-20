import { Container, ContainerInstance } from "typedi";

export const defineService = () => {
  return "service";
};

export const defineServiceContainer = (name: string): ContainerInstance => {
  return Container.of(name);
};
