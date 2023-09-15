class Charge
{
    constructor(props)
    {
        this.pos = props.pos || mousePosition;
        this.charge = props.charge || 0;
    }
}