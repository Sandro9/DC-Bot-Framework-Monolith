import NoTemplateFound from "../../App/Exceptions/NoTemplateFound";
import Response from "../../App/Exceptions/Response";

try {
    throw new NoTemplateFound('Test Template');
} catch(e) {
    console.log("log test was successfull");
}

try {
    throw new Response(' test ')
} catch(e) {
    console.log('log test was successfull 2');
}