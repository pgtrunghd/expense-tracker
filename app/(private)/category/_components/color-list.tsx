import { colorList } from "@/lib/color-list";

interface IColorList {
  selected: any;
  onSelect: (value: any) => void;
}

export const PaletteList = ({ selected, onSelect }: IColorList) => {
  return (
    <section className="grid grid-cols-6 gap-4 sm:grid-cols-8">
      {colorList.map((item) => (
        <span
          key={item.name}
          style={{ backgroundColor: item.color }}
          className="size-10 cursor-pointer rounded-full"
          onClick={() => onSelect(item.color)}
        />
      ))}
    </section>
  );
};
