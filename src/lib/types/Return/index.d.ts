import { useTSCollection, useTSComponent } from "@devwareng/vanilla-ts";

export type ReturnMainComponents = [ReturnType<typeof useTSComponent>, ReturnType<typeof useTSCollection>]