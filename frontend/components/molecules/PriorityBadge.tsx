import { Badge } from "@/components/atoms/Badge";
import { Priority } from "@/types";

export type PriorityBadgeProps = {
  priority: Priority;
};

const priorityColor: Record<Priority, "green" | "amber" | "red"> = {
  [Priority.Low]: "green",
  [Priority.Medium]: "amber",
  [Priority.High]: "red",
};

export const PriorityBadge = ({ priority }: PriorityBadgeProps) => {
  return <Badge color={priorityColor[priority]}>{priority}</Badge>;
};

export default PriorityBadge;
