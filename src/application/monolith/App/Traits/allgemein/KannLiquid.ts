import { Liquid } from "liquidjs";

export default class KannLiquid
{
    private engine = new Liquid();

    public render_datei_sync(dir: string, name: string, ctx)
    {
        return this.engine.renderFileSync(dir+name, ctx);
    }

    public render_template(template,ctx)
    {
        return this.engine.parseAndRenderSync(template,ctx)
    }
}