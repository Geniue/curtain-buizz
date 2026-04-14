<?php

namespace Database\Seeders;

use App\Models\Gallery;
use Illuminate\Database\Seeder;

class GallerySeeder extends Seeder
{
    public function run(): void
    {
        $items = [
            ['title' => 'ركنة فاخرة مع ستائر ذهبية', 'slug' => 'ركنة-فاخرة-ستائر-ذهبية', 'image' => '/images/work/hero-sofa-curtain-luxury.jpg', 'alt_text' => 'ركنة فاخرة مع ستائر ذهبية - الأشقاء للركن والستائر', 'category' => 'ركن وستائر', 'show_on_home' => true, 'sort_order' => 1],
            ['title' => 'ركنة كحلى مع ستائر فضية', 'slug' => 'ركنة-كحلى-ستائر-فضية', 'image' => '/images/work/sofa-navy-silver-curtain.jpg', 'alt_text' => 'ركنة كحلى مع ستائر فضية أنيقة - الأشقاء', 'category' => 'ركن وستائر', 'show_on_home' => true, 'sort_order' => 2],
            ['title' => 'ستارة زرقاء مع شراشيب', 'slug' => 'ستارة-زرقاء-شراشيب', 'image' => '/images/work/curtain-blue-tassel.jpg', 'alt_text' => 'ستارة زرقاء فاخرة مع شراشيب ذهبية - الأشقاء', 'category' => 'ستائر', 'show_on_home' => true, 'sort_order' => 3],
            ['title' => 'ركنة مودرن مع ستائر زرقاء', 'slug' => 'ركنة-مودرن-ستائر-زرقاء', 'image' => '/images/work/hero-dark-modern.jpg', 'alt_text' => 'ركنة مودرن داكنة مع ستائر زرقاء - الأشقاء', 'category' => 'ركن وستائر', 'show_on_home' => true, 'sort_order' => 4],
            ['title' => 'ستارة زيتونى لغرفة النوم', 'slug' => 'ستارة-زيتونى-غرفة-نوم', 'image' => '/images/work/curtain-olive-bedroom.jpg', 'alt_text' => 'ستارة زيتونى أنيقة لغرفة النوم - الأشقاء', 'category' => 'ستائر', 'show_on_home' => true, 'sort_order' => 5],
            ['title' => 'انتريه مودرن مينيمال', 'slug' => 'انتريه-مودرن-مينيمال', 'image' => '/images/work/sofa-modern-minimalist.jpg', 'alt_text' => 'انتريه مودرن مينيمال بتصميم عصري - الأشقاء', 'category' => 'انتريهات', 'show_on_home' => true, 'sort_order' => 6],
            ['title' => 'ركنة مع ستائر فاخرة عرض كامل', 'slug' => 'ركنة-ستائر-فاخرة-عرض-كامل', 'image' => '/images/work/sofa-curtain-showpiece.jpg', 'alt_text' => 'ركنة مع ستائر فاخرة عرض كامل - الأشقاء', 'category' => 'ركن وستائر', 'show_on_home' => true, 'sort_order' => 7],
            ['title' => 'ستائر تركواز متدرجة', 'slug' => 'ستائر-تركواز-متدرجة', 'image' => '/images/work/curtain-teal-ombre.jpg', 'alt_text' => 'ستائر تركواز متدرجة أنيقة - الأشقاء', 'category' => 'ستائر', 'show_on_home' => true, 'sort_order' => 8],
            ['title' => 'ركنة خضراء مع ستائر', 'slug' => 'ركنة-خضراء-ستائر', 'image' => '/images/work/sofa-green-curtain.jpg', 'alt_text' => 'ركنة خضراء مع ستائر خضراء متناسقة - الأشقاء', 'category' => 'ركن وستائر', 'show_on_home' => true, 'sort_order' => 9],
            ['title' => 'ستائر ذهبية مع فوال كريستال', 'slug' => 'ستائر-ذهبية-فوال-كريستال', 'image' => '/images/work/curtain-gold-crystal.jpg', 'alt_text' => 'ستائر ذهبية فاخرة مع فوال كريستال - الأشقاء', 'category' => 'ستائر', 'show_on_home' => true, 'sort_order' => 10],
            ['title' => 'ركنة بيج مع ستائر ذهبية', 'slug' => 'ركنة-بيج-ستائر-ذهبية', 'image' => '/images/work/sofa-beige-gold-curtain.jpg', 'alt_text' => 'ركنة بيج أنيقة مع ستائر ذهبية - الأشقاء', 'category' => 'ركن وستائر', 'show_on_home' => true, 'sort_order' => 11],
            ['title' => 'ستائر كلاسيك مع كورنيش ذهبى', 'slug' => 'ستائر-كلاسيك-كورنيش-ذهبى', 'image' => '/images/work/curtain-teal-classic.jpg', 'alt_text' => 'ستائر كلاسيك فاخرة مع كورنيش ذهبى - الأشقاء', 'category' => 'ستائر', 'show_on_home' => true, 'sort_order' => 12],
            ['title' => 'ستارة بيج لغرفة النوم', 'slug' => 'ستارة-بيج-غرفة-نوم', 'image' => '/images/work/curtain-beige-bedroom.jpg', 'alt_text' => 'ستارة بيج مودرن لغرفة النوم - الأشقاء', 'category' => 'ستائر', 'show_on_home' => false, 'sort_order' => 13],
            ['title' => 'ستارة ذهبية مودرن', 'slug' => 'ستارة-ذهبية-مودرن', 'image' => '/images/work/curtain-gold-modern.jpg', 'alt_text' => 'ستارة ذهبية مودرن أنيقة - الأشقاء', 'category' => 'ستائر', 'show_on_home' => false, 'sort_order' => 14],
            ['title' => 'تركيب ستائر فريق عمل الأشقاء', 'slug' => 'تركيب-ستائر-فريق-عمل', 'image' => '/images/work/installation-work.jpg', 'alt_text' => 'فريق عمل الأشقاء أثناء تركيب الستائر', 'category' => 'فريق العمل', 'show_on_home' => false, 'sort_order' => 15],
            ['title' => 'ركنة مع ستائر كحلى', 'slug' => 'ركنة-ستائر-كحلى', 'image' => '/images/work/sofa-navy-valance.jpg', 'alt_text' => 'ركنة كحلى مع ستائر وبادرون أنيق - الأشقاء', 'category' => 'ركن وستائر', 'show_on_home' => false, 'sort_order' => 16],
            ['title' => 'ستارة زيتونى بسيطة', 'slug' => 'ستارة-زيتونى-بسيطة', 'image' => '/images/work/curtain-olive-simple.jpg', 'alt_text' => 'ستارة زيتونى بسيطة وأنيقة - الأشقاء', 'category' => 'ستائر', 'show_on_home' => false, 'sort_order' => 17],
            ['title' => 'ستارة زيتونى شيفون', 'slug' => 'ستارة-زيتونى-شيفون', 'image' => '/images/work/curtain-olive-sheer.jpg', 'alt_text' => 'ستارة زيتونى شيفون خفيفة - الأشقاء', 'category' => 'ستائر', 'show_on_home' => false, 'sort_order' => 18],
            ['title' => 'كنبة بلدي نيفي ذهبي', 'slug' => 'كنبة-بلدي-نيفي-ذهبي', 'image' => '/images/work/sofa-baladi-navy-gold.jpg', 'alt_text' => 'كنبة بلدي نيفي مع تشطيبات ذهبية - الأشقاء', 'category' => 'كنب بلدي', 'show_on_home' => false, 'sort_order' => 19],
            ['title' => 'غرفة معيشة واسعة مع ركنة', 'slug' => 'غرفة-معيشة-واسعة-ركنة', 'image' => '/images/work/hero-living-room-wide.jpg', 'alt_text' => 'غرفة معيشة واسعة بركنة وستائر فاخرة - الأشقاء', 'category' => 'ركن وستائر', 'show_on_home' => false, 'sort_order' => 20],
        ];

        foreach ($items as $item) {
            Gallery::create(array_merge($item, [
                'description' => $item['alt_text'],
                'is_active' => true,
            ]));
        }
    }
}
