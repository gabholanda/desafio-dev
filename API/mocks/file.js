const text = `3201903010000014200096206760174753****3153153453JOÃO MACEDO   BAR DO JOÃO       
5201903010000013200556418150633123****7687145607MARIA JOSEFINALOJA DO Ó - MATRIZ
3201903010000012200845152540736777****1313172712MARCOS PEREIRAMERCADO DA AVENIDA
2201903010000011200096206760173648****0099234234JOÃO MACEDO   BAR DO JOÃO       
1201903010000015200096206760171234****7890233000JOÃO MACEDO   BAR DO JOÃO       
2201903010000010700845152540738723****9987123333MARCOS PEREIRAMERCADO DA AVENIDA
2201903010000050200845152540738473****1231231233MARCOS PEREIRAMERCADO DA AVENIDA
3201903010000060200232702980566777****1313172712JOSÉ COSTA    MERCEARIA 3 IRMÃOS
1201903010000020000556418150631234****3324090002MARIA JOSEFINALOJA DO Ó - MATRIZ
5201903010000080200845152540733123****7687145607MARCOS PEREIRAMERCADO DA AVENIDA
2201903010000010200232702980568473****1231231233JOSÉ COSTA    MERCEARIA 3 IRMÃOS
3201903010000610200232702980566777****1313172712JOSÉ COSTA    MERCEARIA 3 IRMÃOS
4201903010000015232556418150631234****6678100000MARIA JOSEFINALOJA DO Ó - FILIAL
8201903010000010203845152540732344****1222123222MARCOS PEREIRAMERCADO DA AVENIDA
3201903010000010300232702980566777****1313172712JOSÉ COSTA    MERCEARIA 3 IRMÃOS
9201903010000010200556418150636228****9090000000MARIA JOSEFINALOJA DO Ó - MATRIZ
4201906010000050617845152540731234****2231100000MARCOS PEREIRAMERCADO DA AVENIDA
2201903010000010900232702980568723****9987123333JOSÉ COSTA    MERCEARIA 3 IRMÃOS
8201903010000000200845152540732344****1222123222MARCOS PEREIRAMERCADO DA AVENIDA
2201903010000000500232702980567677****8778141808JOSÉ COSTA    MERCEARIA 3 IRMÃOS
3201903010000019200845152540736777****1313172712MARCOS PEREIRAMERCADO DA AVENIDA
`

const file = {
    buffer: Buffer.from(text, "utf-8")
};

module.exports = file;