import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react"

import { Badge } from "@/components/ui/badge"
import {
    Card,
    CardAction,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

export function SectionCards() {
    return (
        <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
            <Card className="@container/card">
                <CardHeader>
                    <CardDescription>Total de vendas</CardDescription>
                    <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                        1,250.00 <span className="text-sm">Kzs</span>
                    </CardTitle>
                    <CardAction>
                        <Badge variant="outline">
                            <IconTrendingUp className="text-green-600" />
                            +12.5%
                        </Badge>
                    </CardAction>
                </CardHeader>
                <CardFooter className="flex-col items-start gap-1.5 text-sm">
                    <div className="line-clamp-1 flex gap-2 font-medium">
                        Aumento esse mês <IconTrendingUp className="size-4 text-green-600" />
                    </div>
                    <div className="text-muted-foreground">
                        Visitantes dos últimos 6 meses
                    </div>
                </CardFooter>
            </Card>
            <Card className="@container/card">
                <CardHeader>
                    <CardDescription>Novos usuários</CardDescription>
                    <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                        1,234
                    </CardTitle>
                    <CardAction>
                        <Badge variant="outline">
                            <IconTrendingDown className="text-red-600" />
                            -20%
                        </Badge>
                    </CardAction>
                </CardHeader>
                <CardFooter className="flex-col items-start gap-1.5 text-sm">
                    <div className="line-clamp-1 flex gap-2 font-medium">
                        Baixou 20% nesse período <IconTrendingDown className="size-4 text-red-600" />
                    </div>
                    <div className="text-muted-foreground">
                        Aquisição precisa de atenção
                    </div>
                </CardFooter>
            </Card>
            <Card className="@container/card">
                <CardHeader>
                    <CardDescription>Contas Ativas</CardDescription>
                    <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                        213
                    </CardTitle>
                    <CardAction>
                        <Badge variant="outline">
                            <IconTrendingUp className="text-green-600" />
                            +12.5%
                        </Badge>
                    </CardAction>
                </CardHeader>
                <CardFooter className="flex-col items-start gap-1.5 text-sm">
                    <div className="line-clamp-1 flex gap-2 font-medium">
                        Forte retenção de usuários <IconTrendingUp className="size-4 text-green-600" />
                    </div>
                    <div className="text-muted-foreground">Engajamento excedeu o objectivo</div>
                </CardFooter>
            </Card>
            <Card className="@container/card">
                <CardHeader>
                    <CardDescription>Taxa de Crescimento</CardDescription>
                    <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                        4.5%
                    </CardTitle>
                    <CardAction>
                        <Badge variant="outline">
                            <IconTrendingUp className="text-green-600" />
                            +4.5%
                        </Badge>
                    </CardAction>
                </CardHeader>
                <CardFooter className="flex-col items-start gap-1.5 text-sm">
                    <div className="line-clamp-1 flex gap-2 font-medium">
                        Performance aumentou <IconTrendingUp className="size-4 text-green-600" />
                    </div>
                    <div className="text-muted-foreground">Alcançou projecção de crescimento</div>
                </CardFooter>
            </Card>
        </div>
    )
}
