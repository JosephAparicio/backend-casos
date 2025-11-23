import { PrismaClient, EstadoCaso } from '../src/generated/client/index.js';
import Database from 'better-sqlite3';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';

const db = new Database('./dev.db');
const adapter = new PrismaBetterSqlite3({ url: './dev.db' });
const prisma = new PrismaClient({ adapter });

const nombres = [
    'Demanda laboral - Despido injustificado',
    'Caso penal - Fraude empresarial',
    'Divorcio contencioso - Custodia de menores',
    'Demanda civil - Incumplimiento de contrato',
    'Caso mercantil - Competencia desleal',
    'Amparo contra acto de autoridad',
    'Juicio ejecutivo mercantil',
    'Demanda de pensión alimenticia',
    'Caso de propiedad intelectual',
    'Litigio por daños y perjuicios',
    'Demanda por responsabilidad civil',
    'Caso de derecho sucesorio',
    'Juicio hipotecario',
    'Demanda por acoso laboral',
    'Caso de derecho administrativo',
    'Litigio por arrendamiento',
    'Demanda por incumplimiento contractual',
    'Caso de derecho fiscal',
    'Juicio de nulidad de matrimonio',
    'Demanda por violación de derechos humanos',
];

const descripciones = [
    'Cliente solicita indemnización por terminación injustificada de relación laboral',
    'Investigación por presunto fraude en operaciones comerciales de la empresa',
    'Proceso de divorcio con disputa por custodia de dos menores de edad',
    'Demanda por incumplimiento de cláusulas contractuales en contrato de servicios',
    'Acusación de prácticas desleales en el mercado por parte de competidor',
    'Recurso de amparo contra resolución administrativa considerada ilegal',
    'Cobro de pagarés vencidos mediante procedimiento ejecutivo',
    'Solicitud de pensión alimenticia para menores de edad',
    'Violación de derechos de autor y uso no autorizado de marca registrada',
    'Reclamación por daños materiales y morales derivados de accidente',
    'Demanda por negligencia profesional con consecuencias económicas',
    'Disputa por herencia y distribución de bienes del causante',
    'Ejecución de garantía hipotecaria por falta de pago de crédito',
    'Denuncia por conductas de acoso y hostigamiento en el trabajo',
    'Impugnación de acto administrativo por violación al debido proceso',
    'Conflicto entre arrendador y arrendatario por incumplimiento de contrato',
    'Incumplimiento de obligaciones pactadas en contrato de compraventa',
    'Controversia con autoridad fiscal por determinación de créditos',
    'Solicitud de nulidad matrimonial por causales legales',
    'Violación de garantías individuales por parte de autoridad',
];

const estados: EstadoCaso[] = [EstadoCaso.ABIERTO, EstadoCaso.EN_PROCESO, EstadoCaso.CERRADO, EstadoCaso.ARCHIVADO];

function getRandomElement<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
}

function getRandomDate(start: Date, end: Date): Date {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

async function seed() {
    console.log('Iniciando seed de la base de datos...');

    const startDate = new Date('2024-01-01');
    const endDate = new Date();

    for (let i = 1; i <= 100; i++) {
        const nombre = `${getRandomElement(nombres)} #${i}`;
        const descripcion = getRandomElement(descripciones);
        const estado = getRandomElement(estados);
        const createdAt = getRandomDate(startDate, endDate);

        await prisma.caso.create({
            data: {
                nombre,
                descripcion,
                estado,
                createdAt,
                updatedAt: createdAt,
            },
        });

        if (i % 10 === 0) {
            console.log(`Creados ${i}/100 casos`);
        }
    }

    console.log('Seed completado exitosamente!');
    console.log(`Total de casos en la base de datos: ${await prisma.caso.count()}`);
}

seed()
    .catch((error) => {
        console.error('Error en el seed:', error);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
        db.close();
    });
