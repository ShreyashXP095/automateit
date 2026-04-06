"use client";

import {PlusIcon} from "lucide-react";
import {memo} from "react";
import {Button} from "@/components/ui/button";

export const AddNodeButton = memo(() => {
    return (
        <Button
            variant="outline"
            size="icon"
            onClick={() => {}}
            className="bg-background"
        >
            <PlusIcon/>
        </Button>
    );
});
AddNodeButton.displayName = "AddNodeButton";